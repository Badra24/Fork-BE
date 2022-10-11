"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "id_user" });
      Order.belongsTo(models.Address, { foreignKey: "id_address" });
      Order.hasMany(models.Product_Order, { foreignKey: "id_order" });
      Order.hasOne(models.Expedition, { foreignKey: "id" });
    }
  }
  Order.init(
    {
      no_invoice: DataTypes.STRING,
      total_item: DataTypes.INTEGER,
      total_price: DataTypes.FLOAT,
      shipping_cost: DataTypes.INTEGER,
      total_payment: DataTypes.INTEGER,
      status: DataTypes.STRING,
      cancled_description: DataTypes.STRING,
      id_user: DataTypes.INTEGER,
      id_address: DataTypes.INTEGER,
      payment_receipt: DataTypes.STRING,
      prescription: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
