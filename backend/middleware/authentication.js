const { Session } = require('../models/Session.js');
const { asyncMiddlewareWrapper } = require('../utils/apiUtils.js');
const { UnauthorizedError } = require('../utils/errors.js');

function checkAuthentication() {
    return asyncMiddlewareWrapper(
        async (req, res, next) => {
            const query = { _id: req.cookies['session-id'] };
            const session = await Session.findOne(query);
            if (!session) {
                throw new UnauthorizedError({
                    message: 'Unknown session ID',
                });
            }
            if (Date.now() >= session.expiresAt) {
                await Session.deleteOne({ _id: session._id });
                throw new UnauthorizedError({
                    message: 'Expired session',
                    userMessage: 'Please login.',
                });
            }
            req.context.user.id = session.userId;
            req.context.user.sessionId = session._id;
            next();
        }
    )
}

module.exports = checkAuthentication;
