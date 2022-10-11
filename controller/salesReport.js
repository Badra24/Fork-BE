const { Product, Category,Product_Cart,Product_Order,Product_Stock,Product_Description } = require("../models");
const product = require("../models/product");
const { Op } = require("sequelize");


class salesReportController {
  

  static async getAllProduct(req, res) {
    try {
      let findProduct = await Product.findAll({
        include: [Category,Product_Cart,Product_Order,Product_Stock,Product_Description  ]
      });
      res.status(200).json({ status: "success",
      message : "all Product ", 
      result: findProduct });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }
  
  static async getAllPage(req, res) {
    const page = 1;

    try {
      const { orderby, order, filter, category, dateFrom, dateTo } = req.query;
      let offset = req.query.offset;
      offset = parseInt(offset);
      console.log(req.query);
      let products;
      if (category) {
        products = await Product.findAll({
          include: [
            {
              model: Category,
              attributes: ["category"],
              where: {
                category: { [Op.startsWith]: [category] },
              },
            },
            {
              model: Product_Stock,
            },
            {
              model: Product_Description,
            },
          ],
          // attributes: { exclude: ["updatedAt", "createdAt"] },
          order: order && orderby ? [[orderby, order]] : [],
          where: {
            name: {
              [Op.substring]: [filter],
            },

            
            createdAt: dateFrom&&dateTo ? {
              [Op.between] : [dateFrom, dateTo]
            } :   {[Op.or] : null
            }
          },
          page,
          offset: offset,
          limit: 9,
        });
      } else {
        products = await Product.findAll({
          include: [
            {
              model: Category,
              
            },
            {
              model: Product_Stock,
            },
            {
              model: Product_Description,
            },
          ],
          // attributes: { exclude: ["updatedAt", "createdAt"] },
          where: {
            name: {
              [Op.substring]: [filter],
            },

            createdAt: dateFrom&&dateTo ? {
              [Op.between] : [dateFrom, dateTo]
            } :   {[Op.or] :null
            }
          },
          order: order && orderby ? [[orderby, order]] : [],
          
          page,
          offset,
          limit: 9,
        });
      }

      res
        .status(200)
        .json({ status: "success",
         result: { products, page, offset, } });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  
}

module.exports = salesReportController;
