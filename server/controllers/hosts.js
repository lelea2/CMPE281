'use strict';

var Host = require('../models/').Hosts;
var uuid = require('node-uuid');
var randomip = require('random-ip');

module.exports = {

  create(req, res) {
    var data = req.body;
    var reqBody = {
      id: uuid.v4(),
      name: data.name,
      description: data.description,
      ip: randomip('192.168.2.0', 24),
      status: data.status || true,
      creator_id: req.headers.u
    };
    Host.create(reqBody)
      .then(function (newHost) {
        res.status(200).json(newHost);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    var userId = req.headers.u || '';
    Host.findAll({
      where: {
        creator_id: userId = req.headers.u || ''
      }
    })
    .then(function (hosts) {
      res.status(200).json(hosts);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  update(req, res) {
    var data = req.body;
    var reqBody = {
      name: data.name,
      description: data.description,
      status: data.status || true
    };
    Host.update(reqBody, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json({});
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    Host.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (deletedRecords) {
      res.status(200).json({});
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  }

};
