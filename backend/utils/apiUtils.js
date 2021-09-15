const joi = require('joi');
const _ = require('lodash');
const { InvalidRequestError } = require('../utils/errors.js');

/**
 * Any routes that use an async handler function should wrap the handler with this function.
 * Without this, any errors thrown will not be caught by the error handling middleware, and
 * the app will crash!
 */

function asyncHandlerWrapper(handler) {
    return async (req, res, next) => {
        try {
            const handlerData = await handler(req, res);
            if (!res.headersSent && handlerData) {
                res.json(handlerData);
            }
            next();
        } catch (error) {
            next(error);
        }
    };
}

function asyncMiddlewareWrapper(middleware) {
    return async (req, res, next) => {
        try {
            await middleware(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}

function requestValidation(validationOptions) {
    return (req, res, next) => {
        _.each(validationOptions, (schema, key) => {
            const validationSchema = joi.object().keys(schema);
            const { error } = validationSchema.validate(_.get(req, key, {}));
            if (error) {
                const errorMessage = error.details[0].message;
                throw new InvalidRequestError({
                    message: `Error validating request's ${key}: ${errorMessage}`,
                    userMessage: errorMessage,
                });
            }
        });
        next();
    };
}

module.exports = {
    asyncHandlerWrapper,
    asyncMiddlewareWrapper,
    requestValidation,
}
