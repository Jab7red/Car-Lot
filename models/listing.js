const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    img: {type: String},
    make: {type: String},
    model: {type: String},
    year: {type: String},
    mileage: {type: Number},
    description: {type: String},
    price: {type: Number},
    watching: {type: Number, default: 0},
    sellBy: {type: String},
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;