const express = require('express');

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
    res.render('welcome.ejs')
});

module.exports = indexRouter;