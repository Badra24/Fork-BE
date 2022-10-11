"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Product_Stocks", "id_product");
    await queryInterface.changeColumn("Product_Stocks", "id", {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: "Products",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Product_Stocks", "id_product", {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: "CASCADE",
      references: {
        model: "Products",
        key: "id",
      },
    });
  },
};
