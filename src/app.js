const express = require("express");
const port = 7777;

const app = express(); // the main app
const { adminAuth, userAuth } = require("./middlewares/Auth");
app.use("/admin", adminAuth);

app.get("/user/login", (req, res) => {
  res.send("login");
});

app.use("/user", userAuth, (req, res, next) => {
  res.send("All users ");
});

app.get("/admin/getAllData", (req, res, next) => {
  res.send("All Data Send");
});

app.get("/admin/deleteUser", (req, res, next) => {
  res.send("All Data deleted");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
