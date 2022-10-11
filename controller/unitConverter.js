const { Product_Stock,Product_History,Product } = require("../models");

class unitConverterController {
  static async addunitConverter(req, res) {
    try {
      const { capital_price, profit,selling_price ,sold_qty,stock,id_unit,id } = req.body;
      console.log(id)
      console.log(req.body.id);
      console.log(req.body.profit);

      console.log("dasdasdasdasdasdasdasdas");
      const newProduct_stock = await Product_Stock.create({
        capital_price,
        profit,
        selling_price,
        sold_qty,
        stock,
        id_unit,
        id


      });
      console.log(newProduct_stock)
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

  static async getAllunitConverter(req, res) {
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
  
  

  static async getunitConvertertById(req, res) {
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

  
  static async updateunitConverter (req, res) {
    try {
      const { id } = req.params;
      
      // const { primary_stock,secondary_stock } = req.body

      console.log(id)
      console.log(req.body.secondary_stock);
      console.log(req.body.primary_stock);

      console.log("dasdasdasdasdasdasdasdas");
      const product = await Product.findOne({
        where: {
          id,
        },
      });
      
      const findProduct = await Product_Stock.findOne({
        where: {
          id: id,
        },
      });

      if (!findProduct) {
        throw new Error("product doesn't exist");
      }

      let unitconvertion = findProduct.unit_convertion
      unitconvertion = parseInt(unitconvertion)

      let secondarystock = findProduct.secondary_stock
      secondarystock = parseInt(secondarystock)

      const updateStock = await Product_Stock.update(
        {
          primary_stock : findProduct.primary_stock -1, 
          secondary_stock : secondarystock + unitconvertion 
  ,
        },
        {
          where: {
            id,
          },
        }
      );
     
    
      
    
      
      await Product_History.create(
        {
            product: product.name ,  unit:findProduct.secondary_unit,   quantity : unitconvertion   , type : "unit convertion" , status : "Penambahan"

        }
        
      )
      return res.status(200).json({
        message: "Stock  converted successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
    
  }
  static async deleteunitConverter (req, res) {
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

module.exports =  unitConverterController 
    
