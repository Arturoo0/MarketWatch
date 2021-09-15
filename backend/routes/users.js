const joi = require('joi');
const _ = require('lodash');
const express = require('express');
const { NotFoundError, UnauthorizedError } = require('../utils/errors');
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
    '/:userId/portfolio',
    requestValidation({
        ...baseUserRequestValidationSchema,
        body: {
            name: joi.string().optional(),
            description: joi.string().optional(),
            public: joi.boolean().optional(),
        },
    }),
    asyncHandlerWrapper(
        async (req) => {
            const { userId } = req.params;
            const { user: { id: contextUserId } } = req.context;
            if (contextUserId !== userId) {
                throw new UnauthorizedError({
                    message: 'Unauthorized attempt to create a portfolio',
                });
            }
            const newPortfolio = new Portfolio(req.body);
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
