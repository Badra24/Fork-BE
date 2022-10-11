"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addConstraint("Product_Descriptions", {
    //   fields: ["id"],
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: false,
    //   references: {
    //     model: "Product_Descriptions",
    //     key: "id",
    //   },
    // });
    await queryInterface.changeColumn("Product_Descriptions", "id", {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: "Products",
        key: "id",
      },
    });

    return Promise.resolve();
    // await queryInterface.removeConstraint("Users", "myAttribute");
  },

  async down(queryInterface, Sequelize) {},
};
