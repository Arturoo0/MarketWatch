const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const nameGenerator = require('project-name-generator');

const PortfolioSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: uuidv4,
    },
    name: {
        type: String,
        required: false,
        default: () => {
            return nameGenerator({
                words: 3,
                alliterative: true,
            }).dashed;
        },
    },
    public: {
        type: Boolean,
        required: false,
        default: false,
    },
    creationDate: {
        type: Number,
        required: false,
        default: Date.now(),
    },
    lastEditedDate: {
        type: Number,
        required: false,
        default: Date.now(),
    },
    securities: {
        type: [String],
        required: false,
        default: [],
    },
});

module.exports = {
    PortfolioSchema,
    Portfolio: mongoose.model('Portfolio', PortfolioSchema),
};
