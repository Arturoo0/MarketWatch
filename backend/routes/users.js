const express = require('express');
const checkAuthentication = require('../middleware/authentication');
const { asyncHandlerWrapper } = require('../utils/apiUtils');
const { NotFoundError } = require('../utils/errors');

const { User } = require('../models/User.js');
const { Portfolio } = require('../models/Portfolio');

const usersRouter = express.Router();

usersRouter.use(checkAuthentication());

usersRouter.get(
    '/me/portfolios',
    asyncHandlerWrapper(
        async (req) => {
            const { user: { id: userId } } = req.context;
            const user = await User.findOne({ _id: userId }).select('portfolios');
            if (!user) {
                throw new NotFoundError({
                    message: `No user found with id: ${userId}`
                });
            }
            const portfolioIds = user.portfolios;
            const portfolios = await Portfolio.find()
                .where('_id')
                .in(portfolioIds)
                .select('name public lastEditedDate');
            return {
                portfolios,
            };
        }
    ),
);

module.exports = {
    usersRouter,
};
