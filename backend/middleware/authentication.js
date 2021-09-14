const { Session } = require('../models/Session.js');
const { asyncMiddlewareWrapper } = require('../utils/apiUtils.js');
const { UnauthorizedError } = require('../utils/errors.js');

function checkAuthentication() {
    return asyncMiddlewareWrapper(
        async (req, res, next) => {
            const query = { sessionID: req.cookies['session-id'] };
            const sessionExists = await Session.exists(query);
            if (!sessionExists) {
                throw new UnauthorizedError();
            }
            next();
        }
    )
}

module.exports = checkAuthentication;
