"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Expeditions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Orders",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      cost: {
        type: Sequelize.FLOAT,
      },
      courier: {
        type: Sequelize.STRING,
      },
      service: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      estimation_time: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Expeditions");
  },
};
