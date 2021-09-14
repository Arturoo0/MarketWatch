const mongoose = require('mongoose');

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

const SessionSchema = mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Number,
        required: false,
        default: () => {
            return Date.now() + THIRTY_DAYS;
        },
    },
});

module.exports = {
    SessionSchema,
    Session: mongoose.model('Session', SessionSchema),
};
