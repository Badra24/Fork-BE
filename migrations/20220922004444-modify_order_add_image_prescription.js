"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Orders", "id_recipe");
    await queryInterface.dropTable("Recipes");
    await queryInterface.addColumn("Orders", "prescription", {
      type: Sequelize.STRING,
      after: "payment_receipt",
    });
    await queryInterface.addColumn("Orders", "note", {
      type: Sequelize.STRING,
      after: "prescription",
    });
  },

  async down(queryInterface, Sequelize) {},
};
