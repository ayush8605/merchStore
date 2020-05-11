var express = require("express");
var router = express.Router();

const {
  createCategory,
  getCategoryById,
  getCategory,
  getAllCategories,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { isAdmin, isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getuserById } = require("../controllers/user");

// params
router.param("userId", getuserById);
router.param("categoryId", getCategoryById);

// routes

//create

router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//read

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

//update

router.put(
  "/category/:userid/:categoryId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//delete

router.delete(
  "/category/:userid/:categoryId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;
