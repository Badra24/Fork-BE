'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_History.init({
    product: DataTypes.STRING,
    unit: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    type: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product_History',
  });
  return Product_History;
};