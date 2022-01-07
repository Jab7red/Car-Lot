// =======================================
//             DEPENDENCIES
// =======================================
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
// =======================================
//                 ROUTES
// =======================================
// LOGIN
userRouter.get('/login', (req, res) => {
    res.render('login.ejs', {error: ''});
});

userRouter.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) return res.render('login.ejs', {error: 'Invalid Credentials'});

        const isMatched = bcrypt.compareSync(req.body.password, user.password)
        if(!isMatched) return res.render('login.ejs', {error: 'Invalid Credentials'});

        req.session.user = user._id;
        res.redirect('/home');
    });
});
//SIGN UP
userRouter.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

userRouter.post('/signup', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    User.create(req.body, (err, user) => {
        res.redirect('/login');
    });
});
//LOGOUT
userRouter.get('/logout', (req, res) => {
    req.session.destroy(function() {
        res.redirect('/');
    });
});
// =======================================
//             MODULE EXPORT
// =======================================
module.exports = userRouter;