const logger = require('../utils/logger');

const loggingMiddleware = (req, res, next) => {
    const startTime = process.hrtime.bigint();
    const logRequest = () => {
        const endTime = process.hrtime.bigint();
        const elapsedTime = Number(endTime - startTime);
        const milliseconds = (elapsedTime * 1e-6).toFixed(2);
        logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${milliseconds} ms`);    
    }
    res.on('finish', logRequest);
    next();
}

module.exports = loggingMiddleware;
