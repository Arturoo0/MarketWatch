const express = require('express');
const FinnhubClient = require('../services/finnhub-client');

const marketDataRouter = express.Router();

marketDataRouter.get('/us-ex-symbols', async (req, res) => {
    const usExSymbols = await FinnhubClient.getSymbols();
    res.json(usExSymbols);
});

marketDataRouter.get('/company-profile-2/:symbol', async (req, res) => {
    const companyProfile2 = await FinnhubClient.getCompanyProfile2(req.params.symbol);
    res.json(companyProfile2);
});

module.exports = {
    marketDataRouter
}