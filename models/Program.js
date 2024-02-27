const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "cannot be null"],
  },
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
