const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/user');

passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
    },
    (username, password, done) => {
        User.findOne({username: username}, async (err,user) => {
            if (err) return done(err);
            if (!user) return done(null, false);
            if (!await user.verifyPassword(password)) return done(null,false);
            return done(null,user);
        })
    }
))

passport.serializeUser(function (user, done) {
    console.log('serializeUser', {user});
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function(err,user) {
        console.log('deserializeUser', {user});
        done(err, user);
    });
})