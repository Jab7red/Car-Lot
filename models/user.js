const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);