// =======================================
//             DEPENDENCIES
// =======================================
const express = require('express');
const indexRouter = express.Router();
// =======================================
//             REQUIRE MODEL
// =======================================
const Listing = require('../models/listing');
// =======================================
//                ROUTES
// =======================================
// SEED

const listingSeed = require('../models/listingSeed')

indexRouter.get('/home/seed', (req, res) => {
    Listing.deleteMany({}, (err, allListings) => {});
    Listing.create(listingSeed, (err, data) => {
        res.redirect('/home');
    });
});
// WELCOME
indexRouter.get('/', (req, res) => {
    res.render('welcome.ejs')
});
// INDEX
indexRouter.get('/home', (req, res) => {
    Listing.find({}, (err, allListings) => {
        res.render('home.ejs', {
            listings: allListings,
        });
    });
});
// NEW

// DELETE

// UPDATE

// CREATE

// EDIT

// SHOW
indexRouter.get('/home/:id', (req, res) => {
    Listing.findById(req.params.id, (err, foundListing) => {
        res.render('show.ejs', {
            listing: foundListing,
        });
    });
});
module.exports = indexRouter;