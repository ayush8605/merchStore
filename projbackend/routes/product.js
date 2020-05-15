const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  Image,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getuserById } = require("../controllers/user");

// params
router.param("userId", getuserById);
router.param("productId", getProductById);

//routes
// create
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//read
router.get("/product/:productId", getProduct);
router.get("/product/image/:productId", Image);

//delete
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

//update
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//listing
router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
