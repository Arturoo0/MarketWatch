const express = require('express');
const { asyncHandlerWrapper } = require('../utils/apiUtils.js');

const { Session } = require('../models/Session');
const { Portfolio } = require('../models/Portfolio');
const { User } = require('../models/User');

const testRouter = express.Router();

testRouter.get(
    '/sessions',
    asyncHandlerWrapper(
        async () => {
            const sessions = await Session.find();
            return { sessions };
        }
    )
);

testRouter.get(
    '/users',
    asyncHandlerWrapper(
        async () => {
            const users = await User.find();
            return { users };
        }
    )
);

testRouter.get(
    '/portfolios',
    asyncHandlerWrapper(
        async () => {
            const portfolios = await Portfolio.find();
            return { portfolios };
        }
    )
);

testRouter.get(
    '/purge',
    asyncHandlerWrapper(
        async () => {
            await User.deleteMany();
            await Portfolio.deleteMany();
            await Session.deleteMany();
            return 'OK';
        }
    )
);

testRouter.get(
    '/purge/sessions',
    asyncHandlerWrapper(
        async () => {
            await Session.deleteMany();
            return 'OK';
        }
    )
);

testRouter.get(
    '/purge/users',
    asyncHandlerWrapper(
        async () => {
            await User.deleteMany();
            return 'OK';
        }
    )
);

testRouter.get(
    '/purge/portfolios',
    asyncHandlerWrapper(
        async () => {
            await Portfolio.deleteMany();
            return 'OK';
        }
    )
);

module.exports = testRouter;
