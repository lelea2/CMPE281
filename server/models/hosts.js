'use strict';
module.exports = function(sequelize, DataTypes) {
  var Hosts = sequelize.define('Hosts', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    creator_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    ip: DataTypes.STRING,
    sensorhub_id: {
      type: DataTypes.STRING,
      references: {
        model: 'SensorHubs', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Hosts;
};

