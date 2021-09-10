const fetch = require('node-fetch');

// defaults to US exchanges
const getTickers = async () => {
    const token = `${process.env.FINNHUB_KEY}`
    const resourceLocation = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=` + token; 
    const res = await fetch(resourceLocation);
    const data = await res.json();
}

module.exports = {
    getTickers
}