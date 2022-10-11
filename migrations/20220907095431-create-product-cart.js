"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Product_Carts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_cart: {
        type: Sequelize.INTEGER,
        references: {
          model: "Carts",
          key: "id",
        },
      },
      id_product: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Product_Carts");
  },
};
