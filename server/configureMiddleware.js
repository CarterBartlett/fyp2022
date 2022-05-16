const express = require('express');
const passport = require('passport');
const path = require('path');

const PRODUCTION = process.env.NODE_ENV==='production';

module.exports = app => {
    app.use(require('cors')())
    app.use(require('helmet')());
    app.use(require('morgan')('combined'));
    app.use(require('cookie-parser')());
    
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(require('express-session')({
        secret: 'secretkey',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: true}
    }));
    require('./config/passport');
    app.use(passport.initialize());
    app.use(passport.session());
}