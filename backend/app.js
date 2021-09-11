require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const auth = require('./routes/auth.js');
const logger = require('./utils/logger');
const marketData = require('./routes/marketData.js');
const loggingMiddleware = require('./middleware/logging');
const FinnHubClient = require('./services/finnhub-client');

async function initCore() {
  logger.info('Connecting to MongoDB cluster ...');
  try {
    await mongoose.connect(process.env.DB_URI);
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

async function initApp(port) {
  await initCore();

  const app = express();

  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3001'
  }));
  app.use(cookieParser());
  app.use(express.urlencoded({
    extended: true,
  }));
  app.use(express.json());
  app.use(loggingMiddleware);
  
  app.use('/auth', auth.authRouter);
  app.use('/market-data', marketData.marketDataRouter);

  app.get('/', (req, res) => {
    res.send('Server is running.');
  })
  
  app.listen(port, () => {
    logger.info(`Server listening at http://localhost:${port}`);
  });
}

const PORT = 3000;
initApp(PORT);
