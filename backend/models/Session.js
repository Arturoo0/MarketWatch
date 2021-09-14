const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    sessionID: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
});

module.exports = {
    SessionSchema,
    Session: mongoose.model('Session', SessionSchema),
};
