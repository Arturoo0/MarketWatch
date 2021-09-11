require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const auth = require('./routes/auth.js');
const logger = require('./utils/logger');
const marketData = require('./routes/marketData.js');
const loggingMiddleware = require('./middleware/logging');

const app = express();
const port = 3000;

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

try {
  mongoose.connect(process.env.DB_URI);
} catch (error){
  if (error !== undefined) {
    logger.error(error.message);
  }
  process.exit(1);
}

app.get('/', (req, res) => {
  res.send('Server is running.');
})

app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`);
});