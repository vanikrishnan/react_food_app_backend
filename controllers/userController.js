const users = require('../models/users')
const foodItems = require('../models/foodItems')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = (req, res, next) => {
    const saltRounds = 10;
    console.log('In Create User', req.body)
      console.log(req.body, 'obj')
      bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
        // Store hash in your password DB.
        console.log(req.body.password, 'req.body.password old')
        req.body.password = hash
        console.log(req.body.password, 'req.body.password hashed')
        var user = new users({
            name: req.body.name,
            email: req.body.email,
            contactNo: req.body.contactNo,
            password: req.body.password
        })
        user.save()
        .then(response => {
          console.log('Successfully inserted', response)
          res.json({
              id: response._id
          })
        })
        .catch(err => {
          console.log(err, "error")
          res.status(403).send({error: err})
        })
    });
}

const generateAccessToken = (payload) => {
    const secret_token = process.env.TOKEN_SECRET //crypto.randomBytes(64).toString('hex')
    console.log(secret_token, "secret_token")
    return jwt.sign(payload, secret_token)
}

const login = (req, res, next) => {
    console.log(req.body, "req.body")
    users.find({email: req.body.email})
    .then(user => {
        console.log(user, "user")
        bcrypt.compare(req.body.password, user[0].password).then(function(result) {
        if (result) {
            console.log("matched");
            const payload = { 
                exp: Math.floor(Date.now() / 1000) + (60 * 15),
                email: req.body.email, 
                username: user[0].name,
                cartDetails: (user[0].cartDetails && user[0].cartDetails.length > 0) ?  user[0].cartDetails: []
            }
            const token = generateAccessToken(payload);
            console.log(token, 'token')
            res.json({
                token: token
            })
        }
        else {
        console.log("Unmatched")
        res.status(403).send({error: "Wrong Password"})
        }
        });
    })
    .catch(err => {
        console.log(err)
        res.status(403).send({error: err})
    })
}

const getFoodItems = (req, res, next) => {
    console.log("in food items", req.user)
    foodItems.find()
    .then(response => {
        console.log(response, "response")
        res.send(response);
    })
    .catch(err => {
        console.log("err", err)
        res.status(403).send({error: err})
    })
}

const updateUser = (req, res, next) => {
    console.log(req.body, "req.body")
    users.updateOne({email: req.body.email}, {$set: {cartDetails: req.body.cartDetails}})
    .then(response => {
        console.log(response,"response")
        res.status(200).send("Updated Successfully")
    })
    .catch(err => {
        console.log(err,"err")
        res.status(403).send({error: err})
    })
}

const logout = (req, res, next) => {
    console.log("in logout")
    req.logout();
    res.status(200).send("Logged Out")
    // res.redirect('/');  
}

module.exports = {
    createUser, login, getFoodItems, logout, updateUser
}