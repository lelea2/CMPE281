'use strict';

var Account = require('./accounts');
var VirtualSensors = require('../models/').VirtualSensors;
var TransactionManager = require('../models/').TransactionManager;
var Account = require('./accounts');
var SLA = require('../models/').SLA;
var uuid = require('node-uuid');

var MAX_RATIO = 3;

module.exports = {

  create(req, res) {
    var data = req.body;
    var id = uuid.v4();
    var reqBody = {
      id: id,
      status: data.status || true,
      name: data.name || 'sensor_' + id,
      description: data.description,
      storages: data.storages
    };
    VirtualSensors.create(reqBody)
      .then(function (newSensor) {
        linksensor(req, res, newSensor);
      })
      .catch(function (error) {
        console.log('Error adding virtual sensor');
        res.status(500).json(error);
      });
  },

  linksensor(req, res, newSensor) {
    var userId = req.headers.u;
    var data = req.body;
    var reqBody = {
      id: uuid.v4(),
      user_id: userId,
      sensorhub_id: data.sensorhub_id,
      virtualsensor_id: newSensor.id,
      timestamp: new Date(),
      sensor_id: data.sensor_id,
      status: 'success',
      sla_id: data.sla_id
    };
    TransactionManager.create(reqBody)
      .then(function (newTransaction) {
        newTransaction.vSensor = newSensor;
        res.status(201).json(newTransaction);
      })
      .catch(function(error) {
        console.log('Error adding transaction manager');
        res.status(500).json(error);
      });
  },

  show(req, res) {
    var userId = req.headers.u;
    Account.checkUser(userId, function(data) { //Check for admin vs. user as vendor
      if (data.roles === 'admin') {
        TransactionManager.findAll().then(function(sensors) {
          res.status(200).json(sensors);
        }).catch(function(error) {
          res.status(500).json(error);
        })
      } else {
        TransactionManager.findAll({
          where: {
            user_id: userId
          }
        }).then(function(sensors) {
          res.status(200).json(sensors);
        }).catch(function(error) {
          res.status(500).json(error);
        })
      }
    }, function(err) {
      res.status(500).json(err);
    });
  }

};
