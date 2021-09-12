const bcrypt = require('bcrypt');
const crypto = require('crypto');
const express = require('express');
const User = require('../models/User.js');
const Session = require('../models/Session.js');
const { asyncHandlerWrapper } = require('../utils/apiUtils.js');
const { UnauthorizedError, ConflictError } = require('../utils/errors.js');

const authRouter = express.Router();

const hash = async (cred) => {
    const saltRounds = 10;
    return await bcrypt.hash(cred, saltRounds);
}

const addSessionCookie = async (email, res) => {
    const sessionID = crypto.randomBytes(16).toString('base64');
    const session = new Session({ email, sessionID });
    await session.save();
    res.header('Access-Control-Allow-Credentials', true);
    res.cookie('session-id', sessionID);
}

authRouter.post(
    '/login',
    asyncHandlerWrapper(
        async (req, res) => {
            const { email, username, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                throw new UnauthorizedError({
                    userMessage: 'There is no account registered with this email.'
                });
            }
            const [usernamesMatch, passwordsMatch] = await Promise.all([
                bcrypt.compare(username, user.username),
                bcrypt.compare(password, user.password),
            ]);
            if (!usernamesMatch || !passwordsMatch) {
                throw new UnauthorizedError({
                    userMessage: 'Invalid credentials.'
                });
            }
            await addSessionCookie(email, res);
            return {
                message: 'Successfully logged in.'
            };
        }
    )
);

authRouter.post(
    '/sign-up',
    asyncHandlerWrapper(
        async (req, res) => {
            const { email, username, password } = req.body;
            const userExists = await User.exists({ email });
            if (userExists) {
                throw new ConflictError({
                    userMessage: 'This email is already associated with a registered account.'
                });
            }
            const [hashedUsername, hashedPassword] = await Promise.all([
                hash(username),
                hash(password),
            ]);
            const user = new User({
                email,
                username: hashedUsername,
                password: hashedPassword,
            });
            await user.save();
            await addSessionCookie(email, res);
            res.status(201);
            return {
                message: 'Successfully created account.'
            };
        }
    )
); 

authRouter.get('/is-valid-session', async (req, res) => {
    const query = { sessionID: req.cookies['session-id'] };
    const sessionExists = await Session.exists(query);
    return res.send({
        isAuthenticated: sessionExists 
    });
});

module.exports = {
    authRouter
}
