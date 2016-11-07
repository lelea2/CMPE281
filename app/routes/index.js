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
