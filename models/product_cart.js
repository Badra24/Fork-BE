"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Cart extends Model {
    static associate(models) {
      Product_Cart.belongsTo(models.Product, { foreignKey: "id_product" });
      Product_Cart.belongsTo(models.Cart, { foreignKey: "id_cart" });
    }
  }
  Product_Cart.init(
    {
      id_product: DataTypes.INTEGER,
      id_cart: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_Cart",
    }
  );
  return Product_Cart;
};
