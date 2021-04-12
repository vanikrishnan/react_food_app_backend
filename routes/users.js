var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const users = require('../models/users')
require('dotenv').config()
const passport = require('passport')


var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SECRET;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  console.log(jwt_payload, "jwt_payload")
    users.findOne({email: jwt_payload.email}, function(err, user) {
    console.log(user, "user")
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createUser', userController.createUser);
router.post('/login', userController.login);
router.get('/foodItems', passport.authenticate('jwt', { session: false }), userController.getFoodItems);
router.get('/logout', passport.authenticate('jwt', { session: false }), userController.logout);
router.post('/updateUser', passport.authenticate('jwt', { session: false }), userController.updateUser);

module.exports = router;
