const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((error, category) => {
    if (error) {
      return res.status(400).json({
        error: "category not found",
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  //
  const category = new Category(req.body);
  category.save((error, category) => {
    if (error) {
      return res.status(400).json({
        error: "unable to create the category",
      });
    }
    res.json(category);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((error, categories) => {
    if (error) {
      return res.status(400).json({
        error: "No categories found",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  let category = req.category;
  category.name = req.body.name;

  category.save((error, updatedCategory) => {
    if (error) {
      return res.status(400).json({
        error: "Failed to update category",
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  let category = req.category;

  category.remove((error, category) => {
    if (error) {
      return res.status(400).json({
        error: "Failed to delete category",
      });
    }
    res.json({
      message: `Successfully deleted ${category.name}`,
    });
  });
};
