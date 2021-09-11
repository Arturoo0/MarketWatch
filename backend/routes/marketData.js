const express = require('express');
const FinnhubClient = require('../services/finnhub-client');

const marketDataRouter = express.Router();

marketDataRouter.get('/us-ex-symbols', async (req, res) => {
    const usExSymbols = await FinnhubClient.getSymbols();
    res.json(usExSymbols);
});

module.exports = {
    marketDataRouter
}