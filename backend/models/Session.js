const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    sessionID: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Session', SessionSchema);
