'use strict';

module.exports = function(sequelize, DataTypes) {
  var PaymentInfo = sequelize.define('PaymentInfo', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    userId: DataTypes.STRING,
    card_number: DataTypes.STRING,
    card_owner: DataTypes.STRING,
    expiration_date: DataTypes.STRING,
    address: DataTypes.STRING,
    zip: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    phone: DataTypes.STRING,
    isDefault: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        PaymentInfo.belongsTo(models.Users, {
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      }
    },
    timestamps: false
  });
  return PaymentInfo;
};
