const mongoose = require("mongoose");
const validator = require("validator"); //validator.js for sanitiization
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
      trim: true,
    },
    LastName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      min: 0,
    },
    password: {
      required:true,
      type: String,
      required: true,
      minlength: 6, // basic security
      select: false, // 🚨 don't return password by default in queries
    },
    emailId: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Email is invalid");
        }
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"], // validation
      required: true,
    },
    // Weight in kg
    weight: {
      type: Number,
      min: 0,
      set: (val) => Math.round(val),
      get: (val) => `${val} kg`,
    },
    // Height in cm
    height: {
      type: Number,
      min: 0,
      set: (val) => Math.round(val * 100),
      get: (val) => `${val} cm`,
    },
    // New field: skills array
    skills: [
      {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 2, // prevent empty/1-char skills
      },
    ],
    status: {
      type: String,
      default: "My default status",
    },
    photoUrl: {
      type: String,
      default: "https://i.pravatar.cc/150?img=3",
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
