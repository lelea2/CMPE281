'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users_Sensors = sequelize.define('Users_Sensors', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      references: {
        model: 'Users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    sensorId: {
      type: DataTypes.STRING,
      references: {
        model: 'Users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Users_Sensors;
};
