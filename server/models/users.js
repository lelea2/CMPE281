'use strict';

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    roles: DataTypes.ENUM('admin','vendor', 'customer'),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Users;
};
