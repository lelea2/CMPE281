'use strict';
module.exports = function(sequelize, DataTypes) {
  var WeightSensors = sequelize.define('WeightSensors', {
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
    weight: DataTypes.DECIMAL(10, 2),
    max_weight: DataTypes.DECIMAL(10, 2)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return WeightSensors;
};
