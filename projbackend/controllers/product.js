const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((error, product) => {
      if (error) {
        return res.status(400).json({
          error: "no product found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (error, fields, file) => {
    if (error) {
      return res.status(400).json({
        error: " Not able to upload image",
      });
    }

    // destructure the field
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields of product",
      });
    }

    let product = new Product(fields);

    if (file.image) {
      if (file.image.size > 3000000) {
        return res.status(400).json({
          error: "Image is too large to upload",
        });
      }
      product.image.data = fs.readFileSync(file.image.path);
      product.image.contentType = file.image.type;
    }

    // save the image and product details to DB
    product.save((error, product) => {
      if (error) {
        return res.status(400).json({
          error: "unable to upload image",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.image = undefined;
  return res.json(req.product);
};

// middleware to send image to frontEnd
exports.Image = (req, res, next) => {
  if (req.product.image.data) {
    res.set("Content-Type", req.product.image.contentType);
    return res.send(req.product.image.data);
  }
  next();
};

// delete controllers

exports.deleteProduct = (req, res) => {
  let product = req.product;

  product.remove((error, deletedProduct) => {
    if (error) {
      return res.status(400).json({
        error: "Filed to delete the product",
      });
    }

    res.json({
      message: "Deleted the product ",
      deleteProduct,
    });
  });
};

//update controller
exports.updateProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (error, fields, file) => {
    if (error) {
      return res.status(400).json({
        error: " Not able to upload image",
      });
    }

    // updating the fields in product using lodash
    let product = req.product;
    product = _.extend(product, fields);

    if (file.image) {
      if (file.image.size > 3000000) {
        return res.status(400).json({
          error: "Image is too large to upload",
        });
      }
      product.image.data = fs.readFileSync(file.image.path);
      product.image.contentType = file.image.type;
    }

    // save the image and product details to DB
    product.save((error, product) => {
      if (error) {
        return res.status(400).json({
          error: "unable to update the product",
        });
      }
      res.json(product);
    });
  });
};

// list all products
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-image")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((error, products) => {
      if (error) {
        return res.status(400).json({
          error: "No product found",
        });
      }
      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (error, category) => {
    if (error) {
      return res.status(400).json({
        error: "No category found",
      });
    }
    res.json(category);
  });
};

//increment the sold count and decrement the stock on sail
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { stock: -item.count, sold: +item.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: "bulk operations failed",
      });
    }
    next();
  });
};
