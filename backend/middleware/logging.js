const logger = require('../utils/logger');
const MetricsService = require('../services/metrics-service');

const colors = {
    RED: '\x1b[31m',
    BLUE: '\x1b[34m',
    CYAN: '\x1b[36m',
    GREEN: '\x1b[32m',
}

const reset = '\x1b[0m';

const getStatusColor = (status) => {
    if (status >= 400) return colors.RED;
    if (status >= 300) return colors.CYAN;
    return colors.GREEN;
}

const loggingMiddleware = () => {
    return (req, res, next) => {
        const startTime = process.hrtime.bigint();
        const logRequest = () => {
            const { statusCode } = res;
            const endTime = process.hrtime.bigint();
            const elapsedTime = Number(endTime - startTime);
            const milliseconds = (elapsedTime * 1e-6).toFixed(2);
            MetricsService.recordLatency(milliseconds);
            const color = getStatusColor(statusCode);
            logger.info(`${color}${req.method}${reset} ${req.originalUrl} ${color}${statusCode}${reset} - ${milliseconds} ms`);    
        }
        res.on('finish', logRequest);
        next();
    }
}

module.exports = loggingMiddleware;
