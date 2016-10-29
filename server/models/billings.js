'use strict';
module.exports = function(sequelize, DataTypes) {
  var Billings = sequelize.define('Billings', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    userId: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    amount: DataTypes.DECIMAL(10,2),
    isPaid: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Billings.belongsTo(models.Users, {
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      }
    },
    timestamps: false
  });
  return Billings;
};
