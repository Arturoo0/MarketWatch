const dotenv = require('dotenv').config();

const parsed = dotenv.parsed;

module.exports = {
    FINNHUB_TOKEN: parsed.FINNHUB_KEY,
    DB_URI: parsed.DB_URI,
    PORT: 3000,
    FRONTEND_HOST: 'http://localhost:3001',
};
