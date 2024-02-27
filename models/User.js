const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email  is required"],
    match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
  },
  gender: {
    type: String,
    required: [true, "gender is required"],
    enum: ["male", "female", "other"],
  },
  age: {
    type: Number,
    required: [true, "age is required"],
    min: 14,
    max: 60,
  },
  role: {
    type: String,
    required: [true, "role is required"],
    enum: ["admin", "coach", "user"],
  },
  height: {
    type: Number,
    required: [true, "height is required"],
    min: 100,
    max: 250,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
