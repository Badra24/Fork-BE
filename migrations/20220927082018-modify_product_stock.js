"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Product_Stocks", "stock");
    await queryInterface.removeColumn("Product_Stocks", "id_unit");
    await queryInterface.addColumn("Product_Stocks", "primary_stock", {
      type: Sequelize.INTEGER,
      after: "id",
    });
    await queryInterface.addColumn("Product_Stocks", "primary_unit", {
      type: Sequelize.STRING,
      after: "primary_stock",
    });
    await queryInterface.addColumn("Product_Stocks", "secondary_stock", {
      type: Sequelize.INTEGER,
      after: "primary_unit",
    });
    await queryInterface.addColumn("Product_Stocks", "secondary_unit", {
      type: Sequelize.STRING,
      after: "secondary_stock",
    });
    await queryInterface.addColumn("Product_Stocks", "unit_convertion", {
      type: Sequelize.INTEGER,
      after: "secondary_unit",
    });
    await queryInterface.addColumn("Product_Stocks", "secondary_price", {
      type: Sequelize.INTEGER,
      after: "unit_convertion",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Product_Stocks", "stock", {
      type: Sequelize.INTEGER,
      after: "id",
    });
    await queryInterface.removeColumn("Product_Stocks", "primary_stock");
    await queryInterface.removeColumn("Product_Stocks", "primary_unit");
    await queryInterface.removeColumn("Product_Stocks", "secondary_stock");
    await queryInterface.removeColumn("Product_Stocks", "secondary_unit");
    await queryInterface.removeColumn("Product_Stocks", "unit_convertion");
    await queryInterface.removeColumn("Product_Stocks", "secondary_price");
    await queryInterface.addColumn("Product_Stocks", "id_unit", {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: "CASCADE",
      references: {
        model: "Units",
        key: "id",
      },
    });
  },
};
