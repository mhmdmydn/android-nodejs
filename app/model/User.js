'use-strict'
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
