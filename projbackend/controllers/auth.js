exports.signup = (req, res) => {
  console.log("REQ BODY: ", req.body);
  res.JSON({
    message: "signup route works",
  });
};

exports.signout = (req, res) => {
  res.json({
    message: "useer has logged out bro",
  });
};
