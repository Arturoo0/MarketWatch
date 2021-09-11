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
}

module.exports = new FinnHubClient({
    token: process.env.FINNHUB_KEY,
});
