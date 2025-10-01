const express = require("express");
const port = 7777;

const app = express(); // the main app

app.use("/admin", (req, res, next) => {
  console.log("Admin auth");
  const token = "xyz";
  const isAuthorized = token == "xyz";
  isAuthorized ? next() : res.status(401).send("you are3 bad");
});

app.get("/user", (req, res, next) => {
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
