'use strict';
module.exports = function(sequelize, DataTypes) {
  var LocationSensors = sequelize.define('LocationSensors', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    sensor_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Sensors', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    latitude: DataTypes.DECIMAL(10,6),
    longitude: DataTypes.DECIMAL(10,6),
    src_latitude: DataTypes.DOUBLE,
    src_longitude: DataTypes.DOUBLE,
    dest_latitude: DataTypes.DOUBLE,
    dest_longitude: DataTypes.DOUBLE,
    timestamp: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return LocationSensors;
};
