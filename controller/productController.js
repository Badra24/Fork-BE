const { Product, Category,Product_Cart,Product_Order,Product_Stock,Product_Description } = require("../models");
const product = require("../models/product");
const { Op } = require("sequelize");


class productController {
  static async addProduct(req, res) {
    try {
      const { name } = req.body;

      const newProduct = await Product.create({
        name,
      });
      return res.status(200).json({
        message: "new Product has been created",
        result: newProduct,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

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
  
  static async getAllProductPage(req, res) {
    const page = 1;

    try {
      const { orderby, order, filter, category, datefrom, dateto } = req.query;
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

            
            createdAt: datefrom&&dateto ? {
              [Op.between] : [datefrom, dateto]
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

            createdAt: datefrom&&dateto ? {
              [Op.between] : [datefrom, dateto]
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

  static async getProductById(req, res) {
    try {
      const { id } = req.params;

      const findProduct = await Product.findAll({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: "Get Product",
        result: findProduct,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async editProduct (req, res) {
    try {
      const { id } = req.params;
      
    await Product.update(
        { 
          ...req.body, 
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )

      const product = await Product.findOne({ id })

      return res.status(200).json({
        message: "product Edited",
        product : product
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  
  static async createProduct (req, res) {
    try {
      const { name, code,  price } = req.body;
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "product_images";
      
      const { filename } = req.file;

      const newProduct = await Product.create({
        img_product: `${uploadFileDomain}/${filePath}/${filename}`,
        name,
        code,
        price,
      });
// let statusS = ""
      // if (updateStock.primary_stock <= primary_stock ) {
      //   statusS = "Penambahan"
      // } else {
      //   statusS = "Pengurangan"
      // }
      
      // await stock_history.create(
      //   {
      //      Date , Product , Unit , Qty , Type : "update stock" , status : statusS

      //   }
      // )
      
      return res.status(201).json({
        message: "product created",
        result: newProduct,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    
  }
}
  static async updateProduct (req, res) {
    try {
      const { id } = req.params;
      const { name, code,  price } = req.body;
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "product_images";
      
      const { filename } = req.file;


      const findProduct = await Product.findOne({
        where: {
          id: id,
        },
      });

      if (!findProduct) {
        throw new Error("product doesn't exist");
      }

      await Product.update(
        {
          img_product: `${uploadFileDomain}/${filePath}/${filename}`,
          name,
          code,
          price,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.status(200).json({
        message: "product success edited",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
    
  }
  static async deleteProduct (req, res) {

    try {
      const {id} = req.params
      await Product_Stock.destroy({
        where:{
          id
        }
      })
      await Product.destroy({
        where:{
          id
        }
      })

      return res.status(200).json({
        message: "product deleted",
        result: product,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
    
  }
}

module.exports = productController;
