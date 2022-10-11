"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn("Carts", "buy_qty");
      await queryInterface.removeColumn("Carts", "price");
      await queryInterface.removeColumn("Carts", "note");
      await queryInterface.removeColumn("Carts", "id_order");
      await queryInterface.removeColumn("Carts", "id_product");
      await queryInterface.removeColumn("Carts", "total_price");
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },

  async down(queryInterface, Sequelize) {},
};
