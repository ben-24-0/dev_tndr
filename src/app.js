const express = require("express");
const port = 7777;
const connectDB = require("./config/database");
require("./config/database");
const app = express(); // the main app

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
