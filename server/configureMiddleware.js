const express = require('express');
const passport = require('passport');
const path = require('path');
const _ = require('lodash');
const session = require('cookie-session');

const connection = require('./config/database');

const PRODUCTION = process.env.NODE_ENV==='production';

module.exports = app => {

    app.use(require('cors')({credentials: true, origin: true}))
    app.use(require('helmet')());
    app.use(require('morgan')('combined'));
    app.use(require('cookie-parser')());

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(session({
        name: 'LifeOrganiserApp',
        keys: [process.env.SESSION_SECRET],
        cookie: {
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'none',
            httpOnly: true
        }
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    require('./config/passport');
}