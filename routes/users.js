var express = require('express');
var router = express.Router();
var config = require('config');
var randomstring = require('randomstring');

var crypto = require('crypto');
var secret = config.get('secret');
var secretForToken = config.get('secretForToken');

var User  = require('../models/users.js');

//Add User
router.post('/auth/create', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password
  var name     = req.body.name
  var email    = req.body.email

  var tokenGen = randomstring.generate();

  var passwordHashed = crypto.createHmac('RSA-SHA512', secret)
                             .update(password)
                             .digest('hex');
  var tokenHashed    = crypto.createHmac('RSA-SHA512', secretForToken)
                             .update(tokenGen)
                             .digest('hex');

  var newUser ={
   username: username,
   password: passwordHashed,
   name: name,
   email: email,
   token: tokenHashed
  }

  User.create(newUser, function(err, userCreate){
    if(err) {
      res.status(500).send({'message': 'Create User Failed, Username is repet'})
    } else {
      res.status(200).send({'message': 'Create User Success', 'token': tokenGen})
    }
  })
});

//Auth by Username and Password, Will get a token If you have success verifly
router.post('/auth', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password

  var tokenGen = randomstring.generate();

  var passwordHashed = crypto.createHmac('RSA-SHA512', secret)
                             .update(password)
                             .digest('hex');
  var tokenHashed    = crypto.createHmac('RSA-SHA512', secretForToken)
                             .update(tokenGen)
                             .digest('hex');

//rh80uzg7TjWolIVwDe2X0BKDyTaKnj79

  User.findOne({'username': username, 'password': passwordHashed}, function(err, userAuth){
      if (err) {
        return done(err);
      }

      if (!userAuth) {
        res.status(401).send({'message': 'Auth Failed'})
        return
      }

      if (userAuth.password != passwordHashed) {
        res.status(401).send({'message': 'Auth Failed'})
        return
      } else {
        User.update({token: tokenHashed}, {upsert: true}, function(err, userAuthFinalResult){
          if(err) { console.log(err) }
          res.status(500).send({'token': tokenGen})
        })
      }
  })
});

//Auth By Token
router.get('/auth/', function(req, res, next) {
  var token = req.query.token

  var tokenHashed = crypto.createHmac('RSA-SHA512', secretForToken)
                             .update(token)
                             .digest('hex');

  User.findOne({'token': tokenHashed}, function(err, userAuthToken){
    if (err) {
      return done(err);
    }

    if (!userAuthToken) {
      res.status(401).send({'message': 'Auth Failed'})
      return
    }

    res.status(500).send({'message': 'Auth Success', userAuthToken})
  })
});

module.exports = router;
