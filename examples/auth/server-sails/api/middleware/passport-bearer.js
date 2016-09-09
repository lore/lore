var BearerStrategy = require('passport-http-bearer').Strategy;
var request = require('request');
var url = require('url');

var strategy = new BearerStrategy({}, function (token, done) {

  User.findOne({
    token: token
  }).populate('permissions').then(function(user){

    // todo: decode the JWT token and return 401 if token has expired
    if (user) {
      return done(null, user, {scope: 'all'});
    }

    request.post({
      url: url.resolve(sails.config.auth0.domain, '/tokeninfo'),
      form: {
        id_token: token
      }
    }, function(err, httpResponse, body) {
      if (err) {
        return done(err);
      }

      if (httpResponse.statusCode !== 200) {
        return done(null, false);
      }

      var userData = JSON.parse(body);
      userData.token = token;
      userData.authId = userData.user_id;

      User.findOrCreate({
        authId: userData.authId
      }, userData).then(function(user){
        return User.update(user.id, userData).then(function(updatedUsers){
          return updatedUsers[0];
        });
      }).then(function(currentUser){
        User.findOne(currentUser.id).populate('permissions').then(function(populatedUser) {
          done(null, populatedUser, {scope: 'all'});
        });
      }).catch(function(err) {
        done(err);
      });
    });
  }).catch(function(err) {
    done(err);
  });
});

module.exports = strategy;
