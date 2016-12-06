'use strict';

var Account = require('./accounts');
var TransactionManager = require('../models/').TransactionManager;
var Sensors = require('../models/').Sensors;
var Usage = require('../models/').Usage;
var uuid = require('node-uuid');

module.exports = {
  create(req, res) {
    var data = req.body;
    var reqBody = {
      id: uuid.v4(),
      transaction_manager_id: data.transaction_manager_id,
      data: data.data,
      fromDate: data.fromDate,
      endDate: data.endDate
    };
    Usage.create(reqBody)
      .then(function (newUsage) {
        res.status(201).json(newUsage);
      })
      .catch(function (error) {
        console.log('Error adding usage');
        res.status(500).json(error);
      });
  },

  update(req, res) {
    var data = req.body;
    var reqBody = {
      data: data.data,
    };
    Usage.update(reqBody, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updatedRecord) {
      res.status(200).json({});
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  show(req, res) {
    var userId = req.headers.u;
    Account.checkUser(userId, function(data) { //Check for admin vs. user as vendor
      if (data.roles === 'admin') { //admin
        console.log('querying metering for admin...');
        Usage.findAll({
          include: [TransactionManager]
        })
        .then(function(data) {
          res.status(200).json(data);
        })
        .catch(function(error) {
          res.status(500).json(error)
        });
      } else if (data.roles === 'vendor') { //vendor
        console.log('querying metering for vendor...');
        Sensors.findAll({
          where: {
            provider_id: userId,
            attributes: ['id'] //only return id
          }
        })
        .then(function(sensorIds) {
          Usage.findAll({
            include: [{
              model: TransactionManager,
              where: {
                id: {
                  $in: sensorIds
                }
              }
            }]
          })
          .then(function(data) {
            res.status(200).json(data);
          })
          .catch(function(error) {
            res.status(500).json(error)
          });
        })
        .catch(function(error) {
          res.status(500).json(error);
        });
      } else { //customer
        console.log('querying metering for customer...');
        Usage.findAll({
          include: [{
            model: TransactionManager,
            where: {
              user_id: userId
            }
          }]
        })
        .then(function(data) {
          res.status(200).json(data);
        })
        .catch(function(error) {
          console.log(error);
          res.status(500).json(error)
        });
      }
    }, function(err) {
      res.status(500).json(err);
    });
  }
};
