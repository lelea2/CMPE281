'use strict';

module.exports = function(sequelize, DataTypes) {
  var Usage = sequelize.define('Usage', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Users', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    transaction_manager_id: {
      type: DataTypes.STRING,
      references: {
        model: 'TransactionManager', // Can be both a string representing the table name, or a reference to the model
        key: 'id'
      }
    },
    data: DataTypes.TEXT,
    timestamp: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false,
    freezeTableName: true,
    // define the table's name
    tableName: 'TransactionManager'
  });

  return Usage;
};

