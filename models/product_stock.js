"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Stock extends Model {
    static associate(models) {
      Product_Stock.belongsTo(models.Product, { foreignKey: "id" });
    }
  }
  Product_Stock.init(
    {
      primary_stock: DataTypes.INTEGER,
      primary_unit: DataTypes.STRING,
      secondary_stock: DataTypes.INTEGER,
      secondary_unit: DataTypes.STRING,
      unit_convertion: DataTypes.INTEGER,
      secondary_price: DataTypes.INTEGER,
      sold_qty: DataTypes.INTEGER,
      capital_price: DataTypes.INTEGER,
      selling_price: DataTypes.INTEGER,
      profit: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_Stock",
    }
  );
  return Product_Stock;
};
