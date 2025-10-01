const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://benzalot:U1u7AzyNw6geWVu0@benz.ekdkifk.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
