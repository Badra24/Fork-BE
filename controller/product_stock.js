const { Product_Stock,Product_History,Product } = require("../models");
const { updateProduct } = require("./productController");

class productStockController {
  static async addProductStock(req, res) {
    try {
      const { capital_price, profit,selling_price ,sold_qty,id_unit,id,primary_stock,
        primary_unit,secondary_stock,secondary_unit,secondary_price,unit_convertion } = req.body;
      console.log(id)
      console.log(req.body.id);
      console.log(req.body.profit);

      console.log("dasdasdasdasdasdasdasdas");
      const newProduct_stock = await Product_Stock.create({
        capital_price,
        profit,
        selling_price,
        sold_qty,
        primary_stock,
        id_unit,
        id,
        primary_unit,
        secondary_stock,
        secondary_unit,
        secondary_price,
        unit_convertion,


      });
      console.log(newProduct_stock)
        // await Product_history.create(
      //   {
      //      Date , Product , Unit , Qty , Type : penambahan 

      //   }
      // )
      return res.status(200).json({
        message: "new Product stock has been created",
        result: newProduct_stock,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getAllProductStock(req, res) {
    try {
      let findProduct = await Product_Stock.findAll({
        
      });
      res.status(200).json({ status: "success",
      message : "all Product Stock ", 
      result: findProduct });
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

      const findProduct = await Product_Stock.findAll({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: "Get Product_Stock",
        result: findProduct,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  
  static async updateProductStock (req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: {
          id,
        },
      });

      const findProduct = await Product_Stock.findOne({
        where: {
          id,
        },
      });

      if (!findProduct) {
        throw new Error("product doesn't exist");
      }

      const updateStock = await Product_Stock.update(
        {
          ...req.body
          
        },
        {
          where: {
            id,
          },
        }

      );
      let statusS = ""
      let quantity =0
      if (findProduct.primary_stock <=req.body.primary_stock ) {
        statusS = "Penambahan"
         quantity = req.body.primary_stock - findProduct.primary_stock
      } else {
        statusS = "Pengurangan"
        quantity =  findProduct.primary_stock -req.body.primary_stock 
      }
      console.log("updateStock");
      console.log(updateStock);
    
      
      await Product_History.create(
        {
            product: product.name ,  unit:findProduct.primary_unit,   quantity   , type : "update stock" , status : statusS

        }
        
      )
      
      return res.status(200).json({
        message: "Stock success edited",
        result : updateStock
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
    
  }
  static async deleteProductStock (req, res) {
    try {
      const {id} = req.params
      await Product_Stock.destroy({
        where:{
          id
        }
      })

      return res.status(200).json({
        message: "product deleted",
        result: Product_Stock,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
    
  }
}

module.exports = productStockController;
