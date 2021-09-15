const crypto = require('crypto');
const mongoose = require('mongoose');

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

const SessionSchema = mongoose.Schema({
    _id: {
        type: String,
        default: () => {
            return crypto.randomBytes(16).toString('base64');
        }
    },
    userId: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Number,
        required: true,
        default: () => {
            return Date.now() + THIRTY_DAYS;
        },
    },
});

module.exports = {
    SessionSchema,
    Session: mongoose.model('Session', SessionSchema),
};
