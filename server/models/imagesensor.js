'use strict';
module.exports = function(sequelize, DataTypes) {
  var ImageSensors = sequelize.define('ImageSensors', {
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
    count_of_passenger: DataTypes.INTEGER,
    max_seat: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return ImageSensors;
};
