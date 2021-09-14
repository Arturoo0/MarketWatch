const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const SecurityTransactionSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: uuidv4,
    },
    securitySymbol: {
        type: String,
        required: true,
    },
    dateOfTransaction: {
        type: Number,
        required: false,
        default: Date.now(),
    },
    transactionType: {
        type: String,
        enum: ['BUY','SELL'],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

module.exports = {
    SecurityTransactionSchema,
    SecurityTransaction: mongoose.model('SecurityTransaction', SecurityTransactionSchema),
};
