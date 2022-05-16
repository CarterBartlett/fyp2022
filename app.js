if (process.env.NODE_ENV !== 'production') {
    var dotenv = require('dotenv').config();
}

var express = require('express');

var cookieParser = require('cookie-parser');
//var morgan = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true});


var app = express();

require('./configureMiddleware')(app);

require('./routes')(app);

module.exports = app;
