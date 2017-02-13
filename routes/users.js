var express = require('express');
var router = express.Router();
var config = require('config');

var crypto = require('crypto');
var secret = config.get('secret');
var secretForToken = config.get('secretForToken');

var User  = require('../models/users.js');

//Auth by Username and Password, Will get a token If you have success verifly
router.post('/auth', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password

  var passwordHashed = crypto.createHmac('RSA-SHA512', secret)
                             .update(password)
                             .digest('hex');
  var tokenHashed    = crypto.createHmac('RSA-SHA512', secretForToken)
                             .update(token)
                             .digest('hex');

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
          res.status(500).send({'message': userAuthFinalResult})
        })
      }
  })
});

//Auth By Token
router.get('/auth/token', function(req, res, next) {
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
