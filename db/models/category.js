'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      category.hasMany(models.record)
    }
  }
  category.init({
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
    pattern: {
      allowNull: false,
      type: DataTypes.STRING
    }

  }, {
    sequelize,
    modelName: 'category',
    tableName: 'categorys'
  })
  return category
}
