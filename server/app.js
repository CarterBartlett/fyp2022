if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

var express = require('express');
var app = express();

require('./configureMiddleware')(app);
require('./routes')(app);

module.exports = app;
