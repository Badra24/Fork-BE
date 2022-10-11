"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn("Orders", "total_product");
      await queryInterface.removeColumn("Orders", "total_transaction");
      await queryInterface.addColumn("Orders", "total_item", {
        type: Sequelize.INTEGER,
        after: "no_invoice",
      });
      await queryInterface.addColumn("Orders", "total_price", {
        type: Sequelize.FLOAT,
        after: "total_item",
      });

      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },

  async down(queryInterface, Sequelize) {},
};
