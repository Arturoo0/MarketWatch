const joi = require('joi');
const _ = require('lodash');
const express = require('express');
const { NotFoundError, ForbiddenError } = require('../utils/errors');
const checkAuthentication = require('../middleware/authentication');
const { asyncHandlerWrapper, requestValidation } = require('../utils/apiUtils');

const { User } = require('../models/User');
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
            const user = await User.findOne({ _id: userId }).select('portfolios');
            if (!user) {
                throw new NotFoundError({
                    message: `No user found with id: ${userId}`
                });
            }
            let portfolios = await Portfolio.find()
                .where('_id')
                .in(user.portfolios);
            if (userId !== contextUserId) {
                portfolios = portfolios.filter((portfolio) => portfolio.public);
            }
            return { portfolios };
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
                isPublic: access === 'public',
            };
            const normalizedPortfolioSchema = _.omitBy(portfolioSchema, (value) => {
                return _.isNil(value) || !value;
            });
            const newPortfolio = new Portfolio(normalizedPortfolioSchema);
            await newPortfolio.save();
            await User.findByIdAndUpdate(
                userId,
                { $push: { portfolios: newPortfolio._id } },
            );
            return { portfolio: newPortfolio };
        }
    ),
);

module.exports = usersRouter;
