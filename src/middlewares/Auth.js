const adminAuth = (req, res, next) => {
  console.log("admin auth getting called");
  const token = "xyz";
  let isAuthenticated = token == "xyz";
  !isAuthenticated ? res.status(418).send("Unauthorized access") : next();
};

const userAuth = (req, res, next) => {
  console.log("user auth getting called");
  const token = "dabc";
  let isAuthenticated = token == "abc";
  !isAuthenticated ? res.status(418).send("Unauthorized user") : next();
};

module.exports = {
  adminAuth,
  userAuth,
};
