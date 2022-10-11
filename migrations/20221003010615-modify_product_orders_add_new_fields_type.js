"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Product_Orders", "type", {
      type: Sequelize.ENUM("Medicine", "Men’s Health",'Women’s Health','Supplements','Medic','Infant ','Vitamins'),
      after: "quantity",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Product_Orders", "type");
  },
};
