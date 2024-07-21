'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      record.belongsTo(models.user, {
        foreignKey: 'userID'
      })
      record.belongsTo(models.category, {
        foreignKey: 'categoryID'
      })
    }
  }
  record.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    amount: {
      allowNull: false,
      validate: {
        min: 0 // 最小值為 0
      },
      type: DataTypes.INTEGER
    },
    userID: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    categoryID: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'record',
    tableName: 'records'
  })
  return record
}
