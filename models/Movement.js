const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name is required"],
    },
    reps:{
        type: String,
        required: [true, "cannot be null"],
    },
    sets:{
        type: String,
        required: [true, "cannot be null"],
    },
});

const Movement = mongoose.model('Movement', movementSchema);

module.exports = Movement;