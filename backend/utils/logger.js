const { createLogger, format, transports } = require('winston');

const logFormatter = (info) => {
    return `\x1b[2m[${info.timestamp}] - \x1b[0m${info.level}: ${info.message}`;
}

const consoleTransportOptions = {
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format:'MMM-DD-YYYY HH:mm:ss'
        }),
        format.printf(logFormatter),
    )
};

const logger = createLogger({
    transports: [
        new transports.Console(consoleTransportOptions),
        new transports.File({
            filename: 'server.log',
            level: 'error'
        }),
    ],
});

module.exports = logger;
