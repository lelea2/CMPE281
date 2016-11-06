'use strict';
module.exports = function(sequelize, DataTypes) {
  var Hosts = sequelize.define('Hosts', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    creator_id: {
      type: DataTypes.STRING
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    ip: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Hosts;
};
