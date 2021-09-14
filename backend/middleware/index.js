const loggingMiddleware = require('./logging');
const errorHandlingMiddleware = require('./errorHandler');
const contextMiddleware = require('./context');

module.exports = {
    loggingMiddleware,
    errorHandlingMiddleware,
    contextMiddleware,
}
