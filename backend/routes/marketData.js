const express = require('express');
const { findById } = require('../models/User');
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

marketDataRouter.get('/company-quote/:symbol', async (req, res) => {
    const companyQuote = await FinnhubClient.getCompanyQuote(req.params.symbol);
    res.json(companyQuote);
})

module.exports = {
    marketDataRouter
}