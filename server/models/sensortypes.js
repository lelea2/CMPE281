'use strict';
module.exports = function(sequelize, DataTypes) {
  var SensorType = sequelize.define('SensorTypes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    type: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return SensorType;
};
