const express = require("express");
const app = express();
const port = 3000;

// Set view engine to EJS
app.set("view engine", "ejs");

// App-wide locals
app.locals.siteTitle = "My Awesome Site";

// Middleware to set request-specific locals
app.use((req, res, next) => {
  res.locals.username = "Alice"; // changes per request
  next();
});

// Route handler
app.get("/", (req, res) => {
  res.render("index"); // res.locals and app.locals are both available in template
});

// Another route with different username
app.get("/bob", (req, res, next) => {
  res.locals.username = "Bob";
  next();
}, (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
