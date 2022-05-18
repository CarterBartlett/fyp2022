const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = require('../models/user');

const localStrategy = new LocalStrategy(
    (username, password, done) => {
        User.findOne({username: username}, async (err,user) => {
            if (err) return done(err);
            if (!user) return done(null, false);
            if (!await user.verifyPassword(password)) return done(null,false);
            return done(null,user);
        })
    }
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        done (null, await User.findById(id));
    } catch (err) {
        done(err);
    }
})

passport.use(localStrategy);