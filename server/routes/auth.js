var express = require('express');
var router = express.Router();
const passport = require('passport');

const User = require('../models/user');

router.get('/ping', (req,res)=>res.send('Pong!'));

router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        res.send(req.user);
    }
)

router.post('/logout', (req,res)=>{
    req.logout();
    res.send(true);
})

router.post('/register', async (req,res) => {
    try {
        const {username, password, firstName, lastName} = req.body;
        const user = new User({
            username,
            password,
            firstName,
            lastName
        });
        user.save(err=>{
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else {
                res.send(user);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

router.get('/user', (req,res) => res.send(req.user ?? false));

module.exports = router;
