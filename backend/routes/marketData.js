const express = require('express');
const FinnhubClient = require('../services/finnhub-client');
const checkAuthentication = require('../middleware/authentication');
const { asyncHandlerWrapper } = require('../utils/apiUtils');

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
    '/company-profile-2/:symbol',
    asyncHandlerWrapper(async (req) => {
        const { symbol } = req.params;
        const companyProfile2 = await FinnhubClient.getCompanyProfile2(symbol);
        return companyProfile2;
    }),
);

marketDataRouter.get(
    '/company-quote/:symbol',
    asyncHandlerWrapper(async (req) => {
        const { symbol } = req.params;
        const companyQuote = await FinnhubClient.getCompanyQuote(symbol);
        return companyQuote;
    })
);

marketDataRouter.get(
    '/company-news/:symbol',
    asyncHandlerWrapper(async (req) => {
        const { symbol } = req.params;
        const companyNews = await FinnhubClient.getCompanyNews(symbol);
        return companyNews;
    })
);

marketDataRouter.get(
    '/company-candles/:symbol/:resolution/:from/:to',
    asyncHandlerWrapper(async (req) => {
        const { 
            symbol,
            resolution,
            from,
            to
        } = req.params;
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
    '/company-basic-financials/:symbol',
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
}