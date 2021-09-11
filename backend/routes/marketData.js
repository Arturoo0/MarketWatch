const express = require('express');
const FinnhubClient = require('../services/finnhub-client');

const marketDataRouter = express.Router();

marketDataRouter.get('/us-ex-symbols', async (req, res) => {
    const { keywords } = req.query;
    const usExSymbols = await FinnhubClient.getSymbols(keywords);
    res.json(usExSymbols);
});

module.exports = {
    marketDataRouter
}