const express = require('express');
const passport = require('passport');
const path = require('path');
const _ = require('lodash');
//const session = require('express-session');
const session = require('cookie-session');
const MongoStore = require('connect-mongo');

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

    //const sessionStore = new MongoStore({mongoUrl: process.env.MONGO_URI, collectionName: 'sessions'});
    app.use(session({
        name: 'LifeOrganiserApp',
        keys: ['secretkey'],
        cookie: {secure: true, maxAge: 30 * 24 * 60 * 60 * 1000}
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    require('./config/passport');
}