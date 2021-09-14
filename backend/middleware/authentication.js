const { Session } = require('../models/Session.js');
const { asyncMiddlewareWrapper } = require('../utils/apiUtils.js');
const { UnauthorizedError } = require('../utils/errors.js');

function checkAuthentication() {
    return asyncMiddlewareWrapper(
        async (req, res, next) => {
            const query = { sessionID: req.cookies['session-id'] };
            const session = await Session.findOne(query);
            if (!session) {
                throw new UnauthorizedError({
                    message: 'Unknown session ID.'
                });
            }
            req.context.user.id = session.userId;
            next();
        }
    )
}

module.exports = checkAuthentication;
