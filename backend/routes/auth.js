const joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const zxcvbn = require('zxcvbn');
const express = require('express');

const { User } = require('../models/User.js');
const { Session } = require('../models/Session.js');
const { Portfolio } = require('../models/Portfolio.js');
const { asyncHandlerWrapper, requestValidation } = require('../utils/apiUtils.js');
const { UnauthorizedError, ConflictError, InvalidRequestError } = require('../utils/errors.js');

const authRouter = express.Router();

const hash = async (cred) => {
    const saltRounds = 10;
    return await bcrypt.hash(cred, saltRounds);
}

const SESSION_ID_COOKIE_NAME = 'session-id';

const addSessionCookie = async (userId, res) => {
    const session = new Session({ userId });
    await session.save();
    res.header('Access-Control-Allow-Credentials', true);
    res.cookie(SESSION_ID_COOKIE_NAME, session._id);
}

const credentialsValidationHandler = requestValidation({
    body: {
        email: joi.string()
            .email()
            .required(),
        username: joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
        password: joi.string().required(),
    },
});

authRouter.post(
    '/login',
    credentialsValidationHandler,
    asyncHandlerWrapper(
        async (req, res) => {
            const { email, username, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                throw new UnauthorizedError({
                    userMessage: 'There is no account registered with this email.'
                });
            }
            const usernamesMatch = username === user.username;
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (!usernamesMatch || !passwordsMatch) {
                throw new UnauthorizedError({
                    userMessage: 'Invalid credentials.'
                });
            }
            await addSessionCookie(user._id, res);
            return {
                message: 'Successfully logged in.'
            };
        }
    )
);

authRouter.post(
    '/logout',
    asyncHandlerWrapper(
        async (req, res) => {
            const sessionId = req.cookies[SESSION_ID_COOKIE_NAME];
            await Session.deleteOneBy({ _id: sessionId });
            res.clearCookie(SESSION_ID_COOKIE_NAME);
            return res.sendStatus(200);
        }
    ),
);

authRouter.post(
    '/sign-up',
    credentialsValidationHandler,
    asyncHandlerWrapper(
        async (req, res) => {
            const { email, username, password } = req.body;
            const passwordAnalysis = zxcvbn(password, [email, username]);
            if (passwordAnalysis.score < 3) {
                const passwordSuggestion = _.get(
                    passwordAnalysis,
                    'feedback.suggestions[0]',
                    'Please try another password.'
                );
                throw new InvalidRequestError({
                    userMessage: `Weak password: ${passwordSuggestion}`,
                });
            }
            const userEmailExists = await User.exists({ email });
            if (userEmailExists) {
                throw new ConflictError({
                    userMessage: 'This email is already associated with a registered account.'
                });
            }
            const usernameExists = await User.exists({ username });
            if (usernameExists) {
                throw new ConflictError({
                    userMessage: 'This username is not available.'
                });
            }
            const defaultPortfolio = new Portfolio();
            await defaultPortfolio.save();
            const hashedPassword = await hash(password);
            const user = new User({
                email,
                username,
                password: hashedPassword,
                portfolios: [defaultPortfolio._id],
            });
            await user.save();
            await addSessionCookie(user._id, res);
            res.status(201);
            return {
                message: 'Successfully created account.'
            };
        }
    )
);

authRouter.get(
    '/is-valid-session',
    asyncHandlerWrapper(
        async (req) => {
            const query = { _id: req.cookies['session-id'] };
            const session = await Session.findOne(query);
            return {
                isAuthenticated: !!session,
                userId: session?.userId,
            };
        }
    )
);

module.exports = authRouter;
