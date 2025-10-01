const validator = require("validator");

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

module.exports = validateSignupData;
