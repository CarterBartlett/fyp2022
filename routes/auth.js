var express = require('express');
const { error } = require('npmlog');
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

router.post('/register', async (req,res) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        user.save(err=>{
            if (err) {
                console.error(err);
                res.status(500).send(err);
            }
            res.send(user);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

router.get('/user', (req,res) => res.send(req.user));

module.exports = router;
