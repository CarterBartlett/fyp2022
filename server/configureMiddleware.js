const express = require('express');
const passport = require('passport');
const path = require('path');
const _ = require('lodash');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const mongoConnection = require('./config/database');

module.exports = async app => {

    app.use(require('cors')({credentials: true, origin: true}))
    app.use(require('helmet')());
    app.use(require('morgan')('combined'));
    app.use(require('cookie-parser')());

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.set('trust proxy', 1);    
    app.use(session({
        secret: process.env.SESSION_SECRET,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: 'sessions'
        }),
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

    console.log('Session');
    
    app.use(passport.initialize());
    app.use(passport.session());
    require('./config/passport');
}