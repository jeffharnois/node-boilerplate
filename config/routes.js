var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , util = require('util')
  , fs = require('fs');

module.exports = function (app, passport, auth, config, hoganTemplateRenderer) {

  // user routes
  var users = require('../app/controllers/users');

  app.get('/logout', users.logout);

  app.get('/login', function(req, res) {
    res.redirect('/');
  });

  app.post('/login', 
    passport.authenticate('local', 
      { failureRedirect: '/', 
        successRedirect: '/admin',
        failureFlash: 'Invalid password.'}
    ), 
    users.session);

  // leave this commented
  // app.post('/signup', users.create);

  app.get("/", function(req, res) {
    res.render("layout", {
      partials: {
        header: "partials/header",
        partial: "partials/index"
      }
    });
  });
};