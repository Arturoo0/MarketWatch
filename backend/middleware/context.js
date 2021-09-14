const { v4: uuidv4 } = require('uuid');

function contextMiddleware() {
    return (req, res, next) => {
        req.context = {
            requestId: uuidv4(),
            user: {
                id: null,
                sessionId: null,
            },
        };
        next();
    }
}

module.exports = contextMiddleware;
