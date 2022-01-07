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
    res.render('login.ejs');
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
    res.send('logout coming soon');
});
// =======================================
//             MODULE EXPORT
// =======================================
module.exports = userRouter;