'use strict';
module.exports = function(sequelize, DataTypes) {
  var SensorHubs = sequelize.define('SensorHubs', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    status: DataTypes.BOOLEAN,
    host_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Hosts', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return SensorHubs;
};
