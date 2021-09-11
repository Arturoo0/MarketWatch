const fetch = require('node-fetch');

class FinnHubClient {
    constructor(config) {
        this.baseRoute = 'https://finnhub.io/api/v1';
        this.hasFetchedSymbols = false;
        this.symbols = {};
        this.config = config;
    }

    async makeExternalApiCall(endpoint, query) {
        const queryWithToken = {
            ...query,
            token: this.config.token,
        };
        const queryString = new URLSearchParams(queryWithToken).toString();
        const url = new URL(`${this.baseRoute}${endpoint}?${queryString}`);
        const response = await fetch(url.href);
        const data = await response.json();
        return data;
    }

    async getSymbols() {
        if (!this.hasFetchedSymbols) {
            this.symbols = await this.makeExternalApiCall('/stock/symbol', {
                exchange: 'US',
            });
            this.hasFetchedSymbols = true;
        }
        return this.symbols;
    }
}

module.exports = new FinnHubClient({
    token: process.env.FINNHUB_KEY,
});
