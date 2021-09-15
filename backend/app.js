const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const logger = require('./utils/logger');
const config = require('./config');
const middleware = require('./middleware');
const FinnHubClient = require('./services/finnhub-client');
const MetricsService = require('./services/metrics-service.js');
const authRouter = require('./routes/auth.js');
const testRouter = require('./routes/test.js');
const usersRouter = require('./routes/users.js');
const marketDataRouter = require('./routes/marketData.js');

const APP_START_TIME = Date.now();

async function initCore() {
    logger.info('Connecting to MongoDB cluster ...');
    try {
        await mongoose.connect(config.DB_URI);
        logger.info('Connected to MongoDB cluster');
    } catch (error) {
        logger.error('Failed to connect to MongoDB cluster ...');
        logger.error(error?.message);
        process.exit(1);
    }

    logger.info('Pre-fetching symbols ...');
    try {
        await FinnHubClient.fetchSymbols();
        logger.info('Successfully pre-fetched symbols');
    } catch (error) {
        logger.error('Failed to pre-fetch, resorting to lazy load ...');
        logger.error(error.message);
    }
}

async function initApp() {
    await initCore();

    const app = express();

    app.use(helmet());
    app.use(cors({
        credentials: true,
        origin: config.FRONTEND_HOST,
    }));
    app.use(cookieParser());
    app.use(express.urlencoded({
        extended: true,
    }));
    app.use(express.json());
    app.use(middleware.contextMiddleware());
    app.use(middleware.loggingMiddleware());
    
    app.use('/auth', authRouter);
    app.use('/market-data', marketDataRouter);
    app.use('/users', usersRouter);
    app.use('/test', testRouter);

    app.get('/status', (req, res) => {
        const statusData = {
            uptime: Date.now() - APP_START_TIME,
            ...MetricsService.getMetricsSummary(),
        };
        res.json(statusData);
    });

    app.use(middleware.errorHandlingMiddleware());
    
    app.listen(config.PORT, () => {
        logger.info(`Server listening at http://localhost:${config.PORT}`);
    });
}

initApp();
