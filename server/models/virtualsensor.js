'use strict';

module.exports = function(sequelize, DataTypes) {
  var VirtualSensors = sequelize.define('VirtualSensors', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    status: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    storages: DataTypes.ENUM('2G', '4G', '8G', '16G'),
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',
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
  return VirtualSensors;
};
