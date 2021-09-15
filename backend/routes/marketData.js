const express = require('express');
const FinnhubClient = require('../services/finnhub-client');
const checkAuthentication = require('../middleware/authentication');
const { asyncHandlerWrapper, requestValidation } = require('../utils/apiUtils');
const joi = require('joi');

const marketDataRouter = express.Router();

marketDataRouter.use(checkAuthentication());

marketDataRouter.get(
    '/us-ex-symbols',
    asyncHandlerWrapper(async (req) => {
        const { keywords } = req.query;
        const usExSymbols = await FinnhubClient.getSymbols(keywords);
        return usExSymbols;
    }),
);

marketDataRouter.get(
    '/company/:symbol/profile',
    asyncHandlerWrapper(async (req) => {
        const { symbol } = req.params;
        const companyProfile = await FinnhubClient.getCompanyProfile(symbol);
        return companyProfile;
    }),
);

marketDataRouter.get(
    '/company/:symbol/quote',
    asyncHandlerWrapper(async (req) => {
        const { symbol } = req.params;
        const companyQuote = await FinnhubClient.getCompanyQuote(symbol);
        return companyQuote;
    })
);

marketDataRouter.get(
    '/company/:symbol/news',
    asyncHandlerWrapper(async (req) => {
        const { symbol } = req.params;
        const companyNews = await FinnhubClient.getCompanyNews(symbol);
        return companyNews;
    })
);

marketDataRouter.get(
    '/company/:symbol/candles',
    requestValidation({
        query: {
            resolution: joi.string().required(),
            from: joi.number().required(),
            to: joi.number().required(),
        }
    }),
    asyncHandlerWrapper(async (req) => {
        const { symbol } = req.params;
        const { resolution, from, to } = req.query;
        const candles = await FinnhubClient.getCompanyCandles(
            symbol,
            resolution,
            from, 
            to
        );
        return candles;
    })
);

marketDataRouter.get(
    '/company/:symbol/basic-financials',
    asyncHandlerWrapper(async (req) => {
        const { symbol } = req.params;
        const financials = await FinnhubClient.getBasicCompanyFinancials(
            symbol
        );
        return financials;
    })
);

module.exports = {
    marketDataRouter
};
