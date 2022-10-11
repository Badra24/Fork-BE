"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Addresses", "is_deleted", {
      type: Sequelize.ENUM,
      values: ["exist", "deleted"],
      defaultValue: "exist",
      after: "id_user",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface
      .removeColumn("users", "status")
      .then(
        queryInterface.sequelize.query(
          'DROP TYPE IF EXISTS "enum_Addresses_is_deleted";'
        )
      );
  },
};
