var express = require("express");
var router = express.Router();

const { signup, signout } = require("../controllers/auth");
const { check, validationResult } = require("express-validator");

// authentication routes
router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("must be at least 3 chars long"),
    check("email").isEmail().withMessage("Please enter a valid email address"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Please enter atleast 5 characters long password"),
    check("password")
      .isAlphanumeric()
      .withMessage(
        "please enter a combination of alphabet and numeric characters"
      ),
  ],
  signup
);
router.get("/signout", signout);

module.exports = router;
