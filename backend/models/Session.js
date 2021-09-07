
const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    sessionID: String
});

module.exports = mongoose.model('Session', SessionSchema);