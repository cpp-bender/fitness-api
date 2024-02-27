const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "cannot be null"],
  },
  movements:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movement",
  }],
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
