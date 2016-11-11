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
    x_coordinate: DataTypes.DECIMAL(10, 6),
    y_coordinate: DataTypes.DECIMAL(10, 6)
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
