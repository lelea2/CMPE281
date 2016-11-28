'use strict';

module.exports = function(sequelize, DataTypes) {
  var SLA = sequelize.define('SLA', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    description: DataTypes.STRING,
    user_rate: DataTypes.DECIMAL(10, 2),
    vendor_rate: DataTypes.DECIMAL(10, 2),
    admin_rate: DataTypes.DECIMAL(10, 2)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return SLA;
};
