const { Category, Product } = require("../models");

class CategoryController {

  static async createCategory(req, res) {
    try{

      const { category  } = req.body;
      
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "product_images";

      const { filename } = req.file;
      
      const newCategory = await Category.create({
      img_category: `${uploadFileDomain}/${filePath}/${filename}`,
      category,
      
    });
    
    return res.status(201).json({
      message: " category created",
      result: newCategory,
    });
  }catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error",
    });
  
  }
}


  static async getAllCategory(req, res) {
    try {
      let findCategorys = await Category.findAll({
        include: [Product],
      });
      res.status(200).json({ status: "success", result: findCategorys });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.toString(),
      });
    }
  }

  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;

      const findCategory = await Category.findAll({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: "Get Category",
        result: findCategory,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }

  static async deleteCategory(req, res) {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ status: "success", data: "deleted" });
  }
  static async updateCategory (req, res) {
    try{


      const { category } = req.body;
     
      
      const { id } = req.params;
      
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "product_images";

      const { filename } = req.file;


      const findCategory = await Category.findOne({
        where: {
          id: id,
        },
      });

      if (!findCategory) {
        throw new Error("product doesn't exist");
      }
      
      const newCategory = await Category.update(
        {
      img_category: `${uploadFileDomain}/${filePath}/${filename}`,
      category,
    },
    {
      where : {
        id,
      }
    }
    
    );
    
    return res.status(201).json({
      message: " category update",
      result: newCategory,
    });
  }catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error",
    });
  
  }

  }
  static async updateCategoryList (req, res) {
    try {
      const { id } = req.params;
      
    await Category.update(
        { 
          ...req.body, 
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )

      const category = await Category.findOne({ id })

      return res.status(200).json({
        message: "category Edited",
        Category : category
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  }
}
  

module.exports = CategoryController
