'use strict';

//Testing DB connection
// var models = require('./server/models/');
// models.sequelize
//   .authenticate()
//   .then(function () {
//     console.log('Connection successful');
//   })
//   .catch(function(error) {
//     console.log("Error creating connection:", error);
//   });

var express = require('express'),
    app = express(),
    path = require('path'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    csrfCrypto = require('csrf-crypto'),
    security = require('./server/helpers/security'),
    expressHbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    routes = require('./app/routes'),
    accounts = require('./server/controllers/accounts'),
    hosts = require('./server/controllers/hosts'),
    payment = require('./server/controllers/payment');

app.use(bodyParser.urlencoded({"extended": false}));
app.use(bodyParser.json())

app.use(cookieParser('keycatboard'));
// app.use(csrfCrypto({ key: 'cmpe281project' }));
// app.use(csrfCrypto.enforcer());

// app.use(function(req, res, next) {
//   if(res.getFormToken !== undefined) {
//     res.locals._csrf = res.getFormToken();
//   }
//   next();
// });

//Set up userId
app.use(function(req, res, next) {
  res.locals._userId = security.getUserId(req) || '';
  next();
});

//Using handlebar helper on both client and server side
//http://codyrushing.com/using-handlebars-helpers-on-both-client-and-server/
app.set('views', __dirname + '/app/views');
app.engine('hbs', expressHbs({
  extname:'.hbs',
  defaultLayout:'main.hbs',
  helpers: require("./public/js/handlebar-helpers/helpers.js").helpers, // same file that gets used on our client
  partialsDir: "app/views/partials/", // same as default, I just like to be explicit
  layoutsDir: "app/views/layouts/" // same as default, I just like to be explicit
}));
app.set('view engine', 'hbs');

/**** Handle static files loaded, include caching, gzip ****/
var oneWeek = 7 * 24 * 3600 * 1000; //caching time in miliseconds
// New call to compress content
app.use(compression());
app.get('*', express.static(path.join(__dirname, 'public'), { maxAge: oneWeek }));

/*****************************************************/
/***************** API Routing ***********************/
/*****************************************************/

//Account components
app.get('/api/accounts/:id', accounts.show);
app.post('/api/accounts', accounts.create);
app.post('/api/login', accounts.login);
app.put('/api/accounts/:id', accounts.update);
app.delete('/api/accounts/:id', accounts.delete);

//Billings components
app.post('/api/payment', payment.create);
app.put('/api/payment/:id', payment.update);

//Hosts components
app.post('/api/hosts', hosts.create);
app.get('/api/hosts', hosts.show);
app.put('/api/hosts/:id', hosts.update);
app.delete('/api/hosts/:id', hosts.delete);

/*****************************************************/
/***************** Views Routing *********************/
/*****************************************************/
app.get('/', routes.signin);
app.get('/sensors', routes.sensors);
app.get('/create', routes.create);
app.get('/hosts', routes.hosts);
app.get('/payment', routes.payment);


app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function () {
  console.log('Server started on port', app.get('port'));
});
