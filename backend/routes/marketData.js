const joi = require('joi');
const express = require('express');
const FinnhubClient = require('../services/finnhub-client');
const checkAuthentication = require('../middleware/authentication');
const { asyncHandlerWrapper, requestValidation } = require('../utils/apiUtils');

const marketDataRouter = express.Router();

marketDataRouter.use(checkAuthentication());

const PAGE_LIMIT = 50;

marketDataRouter.get(
    '/us-ex-symbols',
    requestValidation({
        query: {
            keywords: joi.string()
                .allow('')
                .required(),
            offset: joi.number()
                .min(0)
                .required(),
        },
    }),
    asyncHandlerWrapper(async (req) => {
        const { keywords, offset } = req.query;
        const { US_EX_SYMBOLS } = await FinnhubClient.getSymbols(keywords);
        const total = US_EX_SYMBOLS.length;
        const pages = Math.ceil(total / PAGE_LIMIT);
        const normalizedOffset = offset * PAGE_LIMIT;
        return {
            symbols: US_EX_SYMBOLS.slice(normalizedOffset, normalizedOffset + PAGE_LIMIT),
            total,
            pages,
        };
    }),
);

marketDataRouter.get(
    '/companies/:symbol/profile',
    asyncHandlerWrapper(async (req) => {
        const { symbol } = req.params;
        const companyProfile = await FinnhubClient.getCompanyProfile(symbol);
        return companyProfile;
    }),
);

marketDataRouter.get(
    '/companies/:symbol/quote',
    asyncHandlerWrapper(async (req) => {
        const { symbol } = req.params;
        const companyQuote = await FinnhubClient.getCompanyQuote(symbol);
        return companyQuote;
    })
);

marketDataRouter.get(
    '/companies/:symbol/news',
    asyncHandlerWrapper(async (req) => {
        const { symbol } = req.params;
        const companyNews = await FinnhubClient.getCompanyNews(symbol);
        return companyNews;
    })
);

marketDataRouter.get(
    '/companies/:symbol/candles',
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
    '/companies/:symbol/basic-financials',
    asyncHandlerWrapper(async (req) => {
        const { symbol } = req.params;
        const financials = await FinnhubClient.getBasicCompanyFinancials(
            symbol
        );
        return financials;
    })
);

module.exports = marketDataRouter;
