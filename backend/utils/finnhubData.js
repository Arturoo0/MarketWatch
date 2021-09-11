const fetch = require('node-fetch');

// defaults to US exchanges
const getSymbols = async () => {
    const token = `${process.env.FINNHUB_KEY}`
    const resourceLocation = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=` + token; 
    const res = await fetch(resourceLocation);
    const data = await res.json();
    return data;
}

module.exports = {
    getSymbols
}