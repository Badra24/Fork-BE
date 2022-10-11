"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "default_address", {
      type: Sequelize.INTEGER,
      after: "gender",
      references: {
        model: "Addresses",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "default_address");
  },
};
