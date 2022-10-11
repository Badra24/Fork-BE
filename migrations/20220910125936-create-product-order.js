"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Product_Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_order: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Orders",
          key: "id",
        },
      },
      id_product: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Products",
          key: "id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Product_Orders");
  },
};
