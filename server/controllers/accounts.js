'use strict';

var User = require('../models/').Users;
var uuid = require('node-uuid');
var passwordHelpers = require('../helpers/passwordHelpers');

module.exports = {

  create(req, res) {
    var data = req.body;
    var hashPassword = passwordHelpers.hashPassword(data.password);
    var reqBody = {
      id: uuid.v4(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: hashPassword,
      isAdmin: data.isAdmin || false
    };
    User.create(reqBody)
      .then(function (newUser) {
        res.status(200).json(newUser);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  show(req, res) {
    User.findById(req.params.id)
    .then(function (author) {
      res.status(200).json(author);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  update(req, res) {
    User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  }
};
