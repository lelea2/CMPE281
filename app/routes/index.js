'use strict';

var minify = require('html-minifier').minify;

/**
 * Function minify HTML response
 * @method  minifyHTML
 */
function minifyHTML(html) {
  return minify(html, {
    collapseWhitespace: true,
    minifyJS: true,
    minifyCSS: true
 });
}


//Display signin page
exports.signin = function(req, res, next) {

  res.render('signin', { title: 'Register', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display dashboard page
exports.sensors = function(req, res, next) {
  res.render('instances', { title: 'Dashboard | Instance', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Create sensor page
exports.create = function(req, res, next) {
  res.render('create_sensor', { title: 'Dashboard | Create sensor', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display all hosts
exports.hosts = function(req, res, next) {
  res.render('hosts', { title: 'Dashboard | Hosts', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Display all hubs
exports.hubs = function(req, res, next) {
  res.render('hubs', { title: 'Dashboard | Hubs', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Account management
exports.account = function(req, res, next) {
  res.render('account', { title: 'Dashboard | Account', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Billings management
exports.billings = function(req, res, next) {
  res.render('billings', { title: 'Dashboard | Billings', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};

//Payment registration
exports.payment = function(req, res, next) {
  res.render('payment', { title: 'Dashboard | Payment', layout: 'main' }, function (err, html) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(minifyHTML(html));
  });
};
