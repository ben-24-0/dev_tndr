const validator = require("validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validateSignupData = async (req) => {
  const { FirstName, LastName, emailId, password, gender } = req.body;
  5;

  if (!FirstName) {
    throw new Error("invalid names");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("invalid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("weak password");
  } else if (!gender) {
    throw new Error("invalid gender");
  }
};

const ValidateLoginData = async (req) => {
  const { emailId, password } = req.body;

  const user = await User.findOne({ emailId: emailId });
  // console.log(user);
  if (!user) {
    throw new Error("invalid credentiels");
  } else {
    // console.log(user.password + " " + password);
    const isPassValid = await bcrypt.compare(password, user.password);
    // console.log(isPassValid);
    return user;
  }
};
module.exports = { validateSignupData, ValidateLoginData };
