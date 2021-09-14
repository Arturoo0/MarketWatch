const fetch = require('node-fetch');
const logger = require('../utils/logger');
const SearchService = require('./search-service');

class FinnHubClient {
    constructor(config) {
        this.baseRoute = 'https://finnhub.io/api/v1';
        this.hasFetchedSymbols = false;
        this.symbols = {};
        this.config = config;
        this.symbolSearchService = new SearchService({
            getBlob: (document) => {
                return `${document.symbol} ${document.description}`;
            },
            returnReference: true,
        });
    }

    async makeExternalApiCall(endpoint, query) {
        const queryWithToken = {
            ...query,
            token: this.config.token,
        };
        const queryString = new URLSearchParams(queryWithToken).toString();
        const url = new URL(`${this.baseRoute}${endpoint}?${queryString}`);
        logger.info(`Making external API request to ${this.baseRoute}${endpoint}/`);
        const response = await fetch(url.href);
        const data = await response.json();
        return data;
    }

    async fetchSymbols() {
        if (this.hasFetchedSymbols) {
            return;
        }
        this.symbols = await this.makeExternalApiCall('/stock/symbol', {
            exchange: 'US',
        });
        this.symbols.sort((symbol, otherSymbol) => {
            return symbol.displaySymbol.localeCompare(otherSymbol.displaySymbol);
        });
        this.symbolSearchService.buildIndex(this.symbols);
        this.hasFetchedSymbols = true;
    }

    async getSymbols(searchQuery) {
        await this.fetchSymbols();
        const potentialMatches = searchQuery
            ? this.symbolSearchService.search(searchQuery)
            : this.symbols;
        return {
            US_EX_SYMBOLS: potentialMatches.slice(0, 50),
        };
    }

    async getCompanyProfile2(companySymbol) {
        const res = await this.makeExternalApiCall('/stock/profile2', {
            symbol: companySymbol
        });
        return {
            companyProfile2: res
        };
    }
    
    async getCompanyQuote(companySymbol) {
        const res = await this.makeExternalApiCall('/quote', {
            symbol: companySymbol
        });
        const {c,d,dp,h,l,o,pc} = res;
        return {
            companyQuote: {
                currentPrice: {
                    description: 'Current price',
                    value: c
                },
                change: {
                    description: 'Change',
                    value: d
                },
                percentChange: {
                    description: 'Percent change',
                    value: dp
                },
                highPriceOfTheDay: {
                    description: 'High price of the day',
                    value: h
                },
                lowPriceOfTheDay : {
                    description: 'Low price of the day',
                    value: l
                },
                openPriceOfTheDay : {
                    description: 'Open price of the day',
                    value: o
                },
                previousClosingPriceOfTheDay : {
                    description: 'Previous closing price of the day',
                    value: pc
                }
            }
        }; 
    }

    async getCompanyNews(companySymbol){
        const res = await this.makeExternalApiCall('/company-news', {
            symbol: companySymbol
        });
        return {
            companyNews : {
                res
            }
        }
    }

    async getCompanyCandles(_symbol, _resolution, _from, _to){
        const res = await this.makeExternalApiCall('/stock/candle', {
            symbol: _symbol,
            resolution: _resolution,
            from: _from,
            to: _to
        });
        const {c,h,l,o,s,t,v} = res;
        return {
            candles : {
                closePrice: c,
                highPrice: h,
                lowPrice: l,
                openPrice: o,
                responseStatus: s,
                timestamp: t,
                volume: v 
            }
        }
    }

    async getBasicCompanyFinancials(_symbol){
        const res = await this.makeExternalApiCall('/stock/metric', {
            symbol: _symbol
        }); 
        return {
            basicCompanyFinancials : {
                res
            }
        }
    };
}

module.exports = new FinnHubClient({
    token: process.env.FINNHUB_KEY,
});
