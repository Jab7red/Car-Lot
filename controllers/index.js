const express = require('express');

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
    res.send('Coming Soon')
});

module.exports = indexRouter;