const express = require('express');
const passport = require('passport');
const path = require('path');
const _ = require('lodash');
//const cookieSession = require('cookie-cookieSession');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const mongoConnection = require('./config/database');

module.exports = app => {

    app.use(require('cors')({credentials: true, origin: true}))
    app.use(require('helmet')());
    app.use(require('morgan')('combined'));
    app.use(require('cookie-parser')());

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.set('trust proxy', 1);
    /*app.use(cookieSession({
        name: 'LifeOrganiserApp',
        keys: [process.env.SESSION_SECRET],
        cookie: {
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'none',
            httpOnly: true
        }
    }));*/
    app.use(session({
        secret: process.env.SESSION_SECRET,
        store: MongoStore.create(mongoConnection),
        saveUninitialized: true,
        cookie: {
            secure: true,
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'none'
        },
        resave: false,
        proxy: true
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    require('./config/passport');
}