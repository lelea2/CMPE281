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

var app = require('express')(),
    bodyParser = require('body-parser'),
    accounts = require('./server/controllers/accounts');

app.use(bodyParser.json());

app.get('/accounts/:id', accounts.show);
app.post('/accounts', accounts.create);
app.put('/accounts/:id', accounts.update);
app.delete('/accounts/:id', accounts.delete);

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function () {
  console.log("Server started on port", app.get('port'));
});
