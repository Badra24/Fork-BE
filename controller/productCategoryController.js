const { Op } = require("sequelize");
const { Product_Category } = require("../models");

class ProductCategory {
  static async addProductCategory(req, res) {
    try {
      const { id_product,id_category1,id_category2 } = req.body;
      console.log("id_categorysdfkljashdklfhaskldjhfaksjdhf")
      console.log(id_category1)
      console.log(id_category2)
      const newProductCat = await Product_Category.bulkCreate([
        { id_category:id_category1 ,
          id_product
        },
        {
        id_category:id_category2 ,
          id_product 
        }

      ]);
      return res.status(200).json({
        message: "new Product Category has been created",
        result: newProductCat,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getAllProductCategory(req, res) {
    try {
      let findProductCategory = await Product_Category.findAll({

      });
      res.status(200).json({ status: "success", result: findProductCategory });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getProductCategoryById(req, res) {
    try {
      const { id } = req.params;

      const findProductCategory = await Product_Category.findAll({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: "Get ProductCategory",
        result: findProductCategory,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async deleteProductCategory(req, res) {
  console.log(req.query);
    await Product_Category.destroy({
      where: {
        [Op.and]: [
          { id_category: req.query.id_cat },
          { id_product: req.query.id_prod }
        ]      },
    });
    res.status(200).json({ status: "success", data: "deleted" });
  }
  static async updateProductCategory (req, res) {
    try {
      const { id } = req.params;
      const { id_product,id_category1,id_category2 } = req.body;
      console.log(id_category1 + id_category2)
      const product_category = 
      await Product_Category.findAll({
        where: {
          id_product: id,
        }
      })

      product_category?.map((val,index) => {
        let id_cat = "";
        if(id_category1 && index == 0) 
        {
          id_cat = id_category1;
        }
        else if(id_category2 && index )
        {
          id_cat = id_category2;
        }
        console.log(val.id_category);
        if(id_cat)
        {
          update_procat(id_cat,val.id_category )
        }
    })

    async function update_procat(id_cat, id_category){
      await Product_Category.update(
        { 
          id_category : id_cat,
        },
        {
          where: {
            id_product:id,
            id_category
          },
        }
      )
    }
      return res.status(200).json({
        message: "Product category Edited",
        product_category : product_category
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }
}

module.exports = ProductCategory;
