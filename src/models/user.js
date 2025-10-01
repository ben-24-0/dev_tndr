const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = Schema({
  Firstname: String,
  LastName: String,
  age: Number,
  emailId: String,
  gender: String,   
});

const UserModel = mongoose.model("User", UserSchema);

module.exports =UserModel;