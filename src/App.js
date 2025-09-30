const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/login", express.static(path.join(__dirname, "..", "public")));
// app.use(express.static(path.join(__dirname,'public')))

app.use("/", (req, res) => {
  res.send("hello");
});
// app.use("/", (req, res) => {
//   console.log(path.join(__dirname, "..", "public"));
//   res.sendFile(path.join(__dirname, "..", "public","index.html"));
// });
app.listen(7777, () => {
  console.log("listening");
});
