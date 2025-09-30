const express = require("express");
const app = express();

// Multiple options
app.get(/^\/(cat|dog|bird)$/, (req, res) => res.send("Animal route"));

app.get("/hello", (req, res) => {
  res.send("case senstive");
});
app.get(/^\/hello$/i, (req, res) => res.send("Hello (case insensitive)"));

// Numbers only
app.get(/^\/product\/[0-9]+$/, (req, res) => res.send("Product route"));
// Matches: /product/123 but not /product/abc

app.get(/^\/ab?cd$/, (req, res) => {
  res.send("matched abcd or acd");
});

app.get(/^\/a(bc)?d$/, (req, res) => {
  res.send({ firstName: "Akshay", lastName: "SAINI" });
});
app.listen(7777, () => {
  console.log("listening");
});
