var express = require("express");
var router = express.Router();

const { signup, signout, signin } = require("../controllers/auth");
const { check, validationResult } = require("express-validator"); // To validate the input given by the user

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

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Invalid username or password"),
    check("password")
      .isLength({ min: 1 })
      .withMessage("Please enter a password"),
  ],
  signin
);
router.get("/signout", signout);

module.exports = router;
