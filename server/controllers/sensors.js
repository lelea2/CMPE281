'use strict';

var SensorType = require('../models/').SensorTypes;
var Sensors = require('../models/').Sensors;
var ClipperSensor = require('../models/').ClipperSensors;
var SpeedSensor = require('../models/').SpeedSensors;
var LocationSensor = require('../models/').LocationSensors;
var TemperatureSensor = require('../models/').TemperatureSensors;
var uuid = require('node-uuid');

module.exports = {

  createSensorDetail(sensor_id, type, res) {
    var data = {},
        id = uuid.v4();
    if (type === '1') { //location sensor
      var DEFAULT_LATITUDE = 37.395012;
      var DEAFULT_LONGITUDE = -121.963972;
      data = {
        id: id,
        sensor_id: sensor_id,
        latitude: DEFAULT_LATITUDE,
        longitude: DEAFULT_LONGITUDE,
        src_latitude: DEFAULT_LATITUDE,
        src_longitude: DEAFULT_LONGITUDE,
        dest_latitude: DEFAULT_LATITUDE,
        dest_longitude: DEAFULT_LONGITUDE
      };
      LocationSensor.create(data)
        .then(function (newSensor) {
          res.status(201).json(newSensor);
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
    } else if (type === '2') { //clipper sensor
      data = {
        id: id,
        count: 0,
        sensor_id: sensor_id
      };
      ClipperSensor.create(data)
        .then(function (newSensor) {
          res.status(201).json(newSensor);
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
    } else if (type === '3') { //speed sensor
      var DEFAULT_SPEED = 0.00;
      data = {
        id: id,
        sensor_id: sensor_id,
        speed: DEFAULT_SPEED
      };
      SpeedSensor.create(data)
        .then(function (newSensor) {
          res.status(201).json(newSensor);
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
    } else { //temperature sensor
      var DEFAULT_TEMP = 70.00;
      data = {
        id: id,
        sensor_id: sensor_id,
        temperature: DEFAULT_TEMP
      };
      TemperatureSensor.create(data)
        .then(function (newSensor) {
          res.status(201).json(newSensor);
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
    }
  },

  create(req, res) {
    var data = req.body;
    var reqBody = {
      id: uuid.v4(),
      type: data.type,
      status: true,
      name: data.name,
      description: data.description,
      storage: data.storages,
      provider_id: req.headers.u,
      host_id: data.host_id
    };
    Sensors.create(reqBody)
      .then(function (newSensor) {
        // console.log(newSensor);
        // res.status(200).json(newSensor);
        createSensorDetail(newSensor.id, type, res);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  //Show sensor
  show(req, res) {
    var userId = req.headers.u || '';
    Sensors.findAll({
      where: {
        providerId: userId
      }
    })
    .then(function (sensors) {
      res.status(200).json(sensors);
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
