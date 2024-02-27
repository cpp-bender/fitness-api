require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const {connectDatabase} = require("./helpers/connectDatabase");
const User = require('./models/User');

// routers
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(PORT, () => {
  connectDatabase();
  console.log(`app started at http://localhost:${PORT}`);
});
