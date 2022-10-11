"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Order extends Model {
    static associate(models) {
      Product_Order.belongsTo(models.Product, {
        foreignKey: "id_product",
      });

      Product_Order.belongsTo(models.Order, { foreignKey: "id_order" });
    }
  }
  Product_Order.init(
    {
      id_order: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      type: DataTypes.ENUM("Medicine", "Chemical Raw"),
    },
    {
      sequelize,
      modelName: "Product_Order",
    }
  );
  return Product_Order;
};
