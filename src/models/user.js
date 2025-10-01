const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    Firstname: { 
      type: String, 
      required: true, 
      trim: true 
    },
    LastName: { 
      type: String, 
      trim: true 
    },
    age: { 
      type: Number, 
      min: 0 
    },
    emailId: { 
      type: String, 
      unique: true, 
      required: true, 
      lowercase: true, 
      trim: true 
    },
    gender: { 
      type: String, 
      enum: ["male", "female", "other"], // validation
      required: true 
    },
    // Weight in kg
    weight: { 
      type: Number,
      min: 0,
      set: (val) => Math.round(val), 
      get: (val) => `${val} kg`       
    },
    // Height in cm
    height: { 
      type: Number,
      min: 0,
      set: (val) => Math.round(val * 100), 
      get: (val) => `${val} cm`            
    },
    // New field: skills array
    skills: [
      {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 2, // prevent empty/1-char skills
      }
    ]
  },
  { 
    timestamps: true,
    toJSON: { getters: true },  
    toObject: { getters: true } 
  }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
