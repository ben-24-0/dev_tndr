const bcrypt = require("bcrypt");

const passHash = async (password) => {
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(password, saltRounds);
  return hashedPass;
};

module.exports = passHash;
