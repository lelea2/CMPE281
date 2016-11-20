'use strict';

var SensorType = require('../models/').SensorTypes;
var Sensors = require('../models/').Sensors;
var ClipperSensor = require('../models/').ClipperSensors;
var SpeedSensor = require('../models/').SpeedSensors;
var LocationSensor = require('../models/').LocationSensors;
var TemperatureSensor = require('../models/').TemperatureSensors;
var uuid = require('node-uuid');

module.exports = {

  create(req, res) {
    var data = req.body;
    var reqBody = {
      id: uuid.v4(),
      type: data.type,
      isEmulator: data.isEmulator || false,
      status: true,
      name: data.name,
      description: data.description,
      storage: data.storages
    };
    Sensors.create(reqBody)
      .then(function (newSensor) {
        console.log(newSensor);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  type(req, res) {
    SensorType.findAll().then(function(types) {
      res.status(200).json(types);
    }).catch(function(error) {
      res.status(500).json(error);
    })
  }
};
