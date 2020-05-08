const User = require("../models/user");
const { check, validationResult } = require("express-validator");

exports.signup = (req, res) => {
  console.log("REQ BODY: ", req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({
      error: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "Not able to save the user !",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signout = (req, res) => {
  res.json({
    message: "useer has logged out bro",
  });
};
