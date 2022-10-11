"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn("Carts", "total_item", {
        type: Sequelize.INTEGER,
        after: "id_user",
      });
      await queryInterface.addColumn("Carts", "total_price", {
        type: Sequelize.FLOAT,
        after: "total_item",
      });
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Carts", "total_item");
    await queryInterface.removeColumn("Carts", "total_price");
  },
};
