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
    billings = require('./server/controllers/billings'),
    route = require('./server/controllers/routes'),
    hubs = require('./server/controllers/sensorhubs'),
    hosts = require('./server/controllers/hosts'),
    payment = require('./server/controllers/payment'),
    sensors = require('./server/controllers/sensors'),
    virtualsensors = require('./server/controllers/virtualsensors'),
    usage = require('./server/controllers/usage'),
    sla = require('./server/controllers/sla');


// console.log('starting...');

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
  res.locals._role = security.getUserRole(req) || 'customer';
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
app.get('/api/payment', payment.show);
app.post('/api/payment', payment.create);
app.put('/api/payment/:id', payment.update);

//Routes components
app.get('/api/routes', route.show);
app.get('/api/routes/:id', route.detail);
app.post('/api/routes', route.create);

//Hosts components
app.post('/api/hosts', hosts.create);
app.get('/api/hosts', hosts.show);
app.get('/api/hosts/:id', hosts.detail);
app.put('/api/hosts/:id', hosts.update);
app.get('/api/hosts_status', hosts.showstatus);
app.delete('/api/hosts/:id', hosts.delete);

//Hubs components
app.get('/api/hubs', hubs.show);
app.post('/api/hubs', hubs.create);
app.post('/api/hubs/:id', hubs.detail);
app.post('/api/hubs/:hub_id/sensors', sensors.show_per_hub);

//Sensors component
app.get('/api/sensors/types', sensors.type);
app.get('/api/sensors', sensors.show); //show sensor per userId
app.post('/api/sensors', sensors.create);
app.post('/api/sensors/:id/status', sensors.update);

//Virtual sensor component
app.post('/api/vsensors', virtualsensors.create);
app.get('/api/vsensors', virtualsensors.show);

//Monitor component
app.get('/api/monitor/statistics', virtualsensors.show);

//Billings components
app.get('/api/billings', billings.show);
app.post('/api/billings', billings.create);

//Usage components
app.post('/api/usage', usage.create);
app.post('/api/usage/:id', usage.update);
app.get('/api/usage', usage.show);

//SLA components
app.get('/api/sla', sla.show);
app.post('/api/sla', sla.create);

/*****************************************************/
/***************** Views Routing *********************/
/*****************************************************/
app.get('/signin', security.userAuthenticated(), routes.signin);
app.get('/', security.userAuthenticated(), routes.signin);
app.get('/sensors', security.userRequiredLoggedIn(), routes.sensors);
app.get('/vsensors', security.userRequiredLoggedIn(), routes.vsensors);
app.get('/monitor', security.userRequiredLoggedIn(), routes.monitor);
app.get('/metering', security.userRequiredLoggedIn(), routes.metering);
app.get('/dashboard', security.userRequiredLoggedIn(), routes.dashboard);
app.get('/create', security.userRequiredLoggedIn(), routes.create);
app.get('/create_vsensor', security.userRequiredLoggedIn(), routes.create_vsensor);
app.get('/hosts', security.userRequiredLoggedIn(), routes.hosts);
app.get('/hubs', security.userRequiredLoggedIn(), routes.hubs);
app.get('/account', security.userRequiredLoggedIn(), routes.account);
app.get('/payment/create', security.userRequiredLoggedIn(), routes.payment);
app.get('/billings', security.userRequiredLoggedIn(), routes.billings);
app.get('/loadbalancing', security.userRequiredLoggedIn(), routes.loadbalancing);

//Log user out
app.get('/logout', function(req, res) {
  security.logout(req);
  res.redirect(302, '/');
});

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function () {
  console.log('Server started on port', app.get('port'));
});
