// =======================================
//             DEPENDENCIES
// =======================================
const express = require('express');
const indexRouter = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');
// =======================================
//             REQUIRE MODEL
// =======================================
const Listing = require('../models/listing');
// =======================================
//            FUNCTION ROUTES
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
indexRouter.put('/home/:id/watch', auth.isAuthenticated, (req, res) => {
    Listing.updateOne({_id:req.params.id}, {$inc:{'watching': 1}},
    (err, listing) => {
        res.redirect(`/home/${req.params.id}`)
    });
});
// BID
indexRouter.put('/home/:id/bid', auth.isAuthenticated, (req, res) => {
    Listing.updateOne({_id:req.params.id}, {$inc:{'price': 500}},
    (err, listing) => {
        res.redirect(`/home/${req.params.id}`);
    });
});
// =======================================
//            INDUCES ROUTES
// =======================================
// INDEX
indexRouter.get('/home', (req, res) => {
    Listing.find({}, (err, allListings) => {
        res.render('home.ejs', {
            listings: allListings,
        });
    });
});
// NEW
indexRouter.get('/home/new', auth.isAuthenticated, (req, res) => {
    res.render('new.ejs');
});
// DELETE
indexRouter.delete('/home/:id', auth.isAuthenticated, (req, res) => {
    Listing.findByIdAndDelete(req.params.id, (err, deleteListing) => {
        res.redirect('/home');
    });
});

// UPDATE
indexRouter.put('/home/:id', auth.isAuthenticated, (req, res) => {
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
indexRouter.post('/home', (req, res) => {
    Listing.create(req.body, (err, createdListing) => {
        res.redirect('/home')
    });
});
// EDIT
indexRouter.get('/home/:id/edit', auth.isAuthenticated, (req, res) => {
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