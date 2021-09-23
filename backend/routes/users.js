const joi = require('joi');
const _ = require('lodash');
const express = require('express');
const { ForbiddenError } = require('../utils/errors');
const checkAuthentication = require('../middleware/authentication');
const { asyncHandlerWrapper, requestValidation } = require('../utils/apiUtils');

const { Portfolio } = require('../models/Portfolio');

const usersRouter = express.Router();

usersRouter.use(checkAuthentication());

const baseUserRequestValidationSchema = {
    params: {
        userId: joi.string()
            .uuid({ version: 'uuidv4' })
            .required(),
    },
};

usersRouter.get(
    '/:userId/portfolios',
    requestValidation(baseUserRequestValidationSchema),
    asyncHandlerWrapper(
        async (req) => {
            const { userId } = req.params;
            const { user: { id: contextUserId } } = req.context;
            const shouldListAllPortfolios = userId === contextUserId;
            const userPortfolios = await Portfolio.find()
                .where('userId').equals(userId)
                .where('public').in([true, !shouldListAllPortfolios]);
            return { portfolios: userPortfolios };
        }
    ),
);

usersRouter.post(
    '/:userId/portfolios',
    requestValidation({
        ...baseUserRequestValidationSchema,
        body: {
            name: joi.string()
                .allow('')
                .optional(),
            description: joi.string()
                .allow('')
                .optional(),
            access: joi.string()
                .valid('private', 'public')
                .required(),
        },
    }),
    asyncHandlerWrapper(
        async (req) => {
            const { userId } = req.params;
            const { user: { id: contextUserId } } = req.context;
            // TODO: Need to take some time to think about how we handle resource/role authorizations.
            if (contextUserId !== userId) {
                throw new ForbiddenError({
                    message: 'Unauthorized attempt to create a portfolio',
                    userMessage: 'You do not have access to this resource.',
                });
            }
            const { name, description, access } = req.body;
            const portfolioSchema = {
                name,
                description,
                public: access === 'public',
                userId,
            };
            const normalizedPortfolioSchema = _.omitBy(portfolioSchema, (value) => {
                return _.isNil(value) || !value;
            });
            const newPortfolio = new Portfolio(normalizedPortfolioSchema);
            await newPortfolio.save();
            return { portfolio: newPortfolio };
        }
    ),
);

usersRouter.post(
    '/:userId/portfolios/:portfolioId/securities',
    requestValidation({
        params: {
            portfolioId: joi.string()
                .uuid({ version: 'uuidv4' })
                .required(), 
            ...baseUserRequestValidationSchema.params
        },
        body: {
            units: joi.string()
                .allow('')
        },
    }),
    asyncHandlerWrapper(
        async (req) => {
            console.log(req.body);
            return {};
        }
    )
);

module.exports = usersRouter;
