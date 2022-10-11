"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: "id_user" });
      Cart.hasMany(models.Product_Cart, { foreignKey: "id_cart" });
    }
  }
  Cart.init(
    {
      id_user: DataTypes.INTEGER,
      total_item: DataTypes.INTEGER,
      total_price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
