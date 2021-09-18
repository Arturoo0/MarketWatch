const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    email: {
        type: String,
        required: true 
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Number,
        required: true,
        default: Date.now,
    },
    banned: {
        type: Boolean,
        required: true,
        default: false,
    },
    roles: {
        type: [String],
        enum: ['USER','ADMIN'],
        required: true,
        default: ['USER'],
    },
});

module.exports = {
    UserSchema,
    User: mongoose.model('User', UserSchema),
};
