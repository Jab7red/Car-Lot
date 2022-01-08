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
// WATCH
indexRouter.put('/home/:id/watch', (req, res) => {
    Listing.updateOne({_id:req.params.id}, {$inc:{'watching': 1}},
    (err, listing) => {
        res.redirect(`/home/${req.params.id}`)
    });
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
indexRouter.put('/home/:id', (req, res) => {
    Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updateListing) => {
            res.redirect(`/home/${req.params.id}`);
        }
    )
});
// CREATE

// EDIT
indexRouter.get('/home/:id/edit', (req, res) => {
    Listing.findById(req.params.id, (err, foundListing) => {
        res.render('edit.ejs', {
            listing: foundListing,
        });
    });
});
// SHOW
indexRouter.get('/home/:id', (req, res) => {
    Listing.findById(req.params.id, (err, foundListing) => {
        res.render('show.ejs', {
            listing: foundListing,
        });
    });
});
module.exports = indexRouter;