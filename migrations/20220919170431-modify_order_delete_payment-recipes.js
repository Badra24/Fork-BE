"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Orders", "id_payment_recipe");
    await queryInterface.dropTable("Payment_Recipes");
    await queryInterface.addColumn("Orders", "payment_receipt", {
      type: Sequelize.STRING,
      after: "id_address",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.createTable("Payment_Recipes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      img_payment_recipe: {
        type: Sequelize.STRING,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.removeColumn("Orders", "payment_recipe");
    await queryInterface.addColumn("Orders", "id_payment_recipe", {
      type: Sequelize.INTEGER,
      after: "id_address",
    });
  },
};
