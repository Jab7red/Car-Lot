// =======================================
//             DEPENDENCIES
// =======================================
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const app = express();
const auth = require('./middleware/auth');
const indexController = require('./controllers/index');
const userController = require('./controllers/users');
require('dotenv').config();
const SECRET = process.env.SECRET
// =======================================
//           DATABASE CONNECTION
// =======================================
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// =======================================
//    DATABASE CONNECTION ERROR/SUCCESS
// =======================================
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));
// =======================================
//               MIDDLEWARE
// =======================================
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(expressSession({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(express.static('public'));
app.use(function(req, res, next) {
    console.log('Session Store: ', req.session);
    next();
});
app.use(auth.handleLoggedInUser);
// =======================================
//              CONTROLLERS
// =======================================
app.use('/', indexController);
app.use('/', userController);
// =======================================
//              CATCH ROUTE
// =======================================
app.get('/*', (req, res) => res.render('catch.ejs'));
// =======================================
//                LISTENER
// =======================================
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`App Listening on port: ${PORT}`);
});