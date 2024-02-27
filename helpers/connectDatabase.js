const mongoose = require("mongoose");

function connectDatabase() {
  mongoose.connect("mongodb://127.0.0.1:27017/fitness-api");
  console.log("connected to database");
}

module.exports ={
  connectDatabase,
};