const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  password: {
    type: String,
    required: [true, "cannot be null"],
    minlength: [6, "provide password with more than 6 chars"],
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
    default: "user",
  },
  height: {
    type: Number,
    required: [true, "height is required"],
    min: 100,
    max: 250,
  },
  program: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
    },
  ],
});

userSchema.pre("save", (next) => {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      // Store hash in your password DB.
      this.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
