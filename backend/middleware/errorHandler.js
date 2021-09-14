const logger = require('../utils/logger');
const { StatusCodes } = require('http-status-codes');
const { SAFE_ERROR_MESSAGE, SAFE_USER_ERROR_MESSAGE } = require('../utils/errors');

const errorHandlingMiddleware = () => {
    return (error, req, res, _next) => {
        logger.error(error.stack);
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const errorMessage = (!error.statusCode)
            ? SAFE_ERROR_MESSAGE
            : error.message;
        res.status(statusCode);
        if (!res.headersSent) {
            res.json({
                error: errorMessage,
                message: error.userMessage || SAFE_USER_ERROR_MESSAGE,
            });
        }
    }    
}

module.exports = errorHandlingMiddleware;
