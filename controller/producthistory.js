const {Product_History , Product,Unit} = require("../models");
const { Op } = require("sequelize");

class HistoryController {
  

  static async getAllhistory(req, res) {
      const { filter , status, no_invoice, order, orderby, datefrom, dateto, limit } =
        req.query;
      let offset = req.query.offset ? req.query.offset : 0;
      offset = parseInt(offset);
  const page = 1
let product_histories
    try {
       product_histories = await Product_History.findAll({
        
        where: {
          product : {
            [Op.substring] : [filter]
          },
          [Op.and]: [
            no_invoice ? { no_invoice } : {},
            datefrom && dateto
              ? {
                  [Op.or]: [
                    {
                      createdAt: {
                        [Op.between]: [datefrom, dateto],
                      },
                    },
                  ],
                }
              : {},
            status ? { status } : {},
          ],
        },
        order: order && orderby ? [[orderby, order]] : [],
   
        limit: limit ? parseInt(limit) : undefined,
        offset,
        page,
      
        
      });
      res.status(200).json({ status: "success", result: {product_histories ,page,offset} });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async gethistoryById(req, res) {
    try {
      const { id } = req.params;

      const findhistory = await Product_History.findAll({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: "Get history",
        result: findhistory,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async deleteHistory(req, res) {
    try {
      await Product_History.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ status: "success", data: "deleted" });
    } catch (error) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }
}

module.exports = HistoryController;
