const { Session } = require('../models/Session.js');
const { asyncMiddlewareWrapper } = require('../utils/apiUtils.js');
const { UnauthorizedError } = require('../utils/errors.js');

function checkAuthentication() {
    return asyncMiddlewareWrapper(
        async (req, res, next) => {
            const query = { sessionId: req.cookies['session-id'] };
            const session = await Session.findOne(query);
            if (!session) {
                throw new UnauthorizedError({
                    message: 'Unknown session ID',
                });
            }
            if (Date.now() >= session.expiresAt) {
                await Session.deleteOne({ sessionId });
                throw new UnauthorizedError({
                    message: 'Expired session',
                    userMessage: 'Please login.',
                });
            }
            req.context.user.id = session.userId;
            req.context.user.sessionId = session.sessionId;
            next();
        }
    )
}

module.exports = checkAuthentication;
