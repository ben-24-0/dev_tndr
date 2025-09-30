const express = require("express");

const app = express();

const port = 3000;

app.use(express.static("public"));

app.use("/use/case", (req, res) => {
  res.send("helloioii");
});

app.use("/use", (req, res) => {
  res.send("helfaagaghoii");
});

app.use("/hello", (req, res) => {
  res.send("check");
});

app.use("/", (req, res, next) => {
  console.log(`method  ${req.method} path ${req.path}`);
  res.send("hello");
  // next();
});

app.listen(port, console.log("listeneing.."));
