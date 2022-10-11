const { Address, User } = require("../models");

class AddressController {
  static async addAddress(req, res) {
    try {
      const { address } = req.body;

      const newAddress = await Address.create({
        address,
      });
      return res.status(200).json({
        message: "new Address has been created",
        result: newAddress,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getAllAddress(req, res) {
    try {
      let findAddresss = await Address.findAll({
        include: [User],
      });
      res.status(200).json({ status: "success", result: findAddresss });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getAddressById(req, res) {
    try {
      const { id } = req.params;

      const findAddress = await Address.findAll({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: "Get Address",
        result: findAddress,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async deleteAddress(req, res) {
    await Address.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ status: "success", data: "deleted" });
  }
}

module.exports = AddressController;
