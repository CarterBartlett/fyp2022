if (process.env.NODE_ENV !== 'production') {
    var dotenv = require('dotenv').config();
}

const connection = require('./config/database');

var express = require('express');
var app = express();

require('./configureMiddleware')(app);
require('./routes')(app);

module.exports = app;
