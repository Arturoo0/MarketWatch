const express = require('express');
const { getSymbols } = require('../utils/finnhubData');
const marketDataRouter = express.Router();

marketDataRouter.get('/us-ex-symbols', async (req, res) => {
    const US_EX_SYMBOLS = await getSymbols();
    res.send({
        US_EX_SYMBOLS
    });
});

module.exports = {
    marketDataRouter
}