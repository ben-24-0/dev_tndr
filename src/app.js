const express = require("express");
const port = 7777;
const connectDB = require("./config/database");
require("./config/database");
const User = require("./models/user");
const app = express(); // the main app

app.post("/signup", async (req, res) => {
  const userObj = {
    Firstname: "Death",
    LastName: "faga",
    age: 24,
    emailId: "hola@gmail.com",
    gender: "male",
  };

  const user = new User(userObj);

  res.send("deleted succesfully");
});

connectDB()
  .then(() => {
    console.log("connected..");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("error");
  });
