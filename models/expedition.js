"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expedition extends Model {
    static associate(models) {}
  }
  Expedition.init(
    {
      cost: DataTypes.FLOAT,
      courier: DataTypes.STRING,
      service: DataTypes.STRING,
      description: DataTypes.STRING,
      estimation_time: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Expedition",
    }
  );
  return Expedition;
};
