const express = require('express');

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
    res.render('welcome.ejs')
});

indexRouter.get('/home', (req, res) => {
    res.render('home.ejs')
});

module.exports = indexRouter;