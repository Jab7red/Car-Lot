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
    res.send('login coming soon');
});
//SIGN UP
userRouter.get('/signup', (req, res) => {
    res.send('signup coming soon');
});
//LOGOUT
userRouter.get('/logout', (req, res) => {
    res.send('logout coming soon');
});
// =======================================
//             MODULE EXPORT
// =======================================
module.exports = userRouter;