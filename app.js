require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const {connectDatabase} = require("./helpers/connectDatabase");
const router = require('./routers/indexRouter');

// built-in middlewares
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  connectDatabase();
  console.log(`app started at http://localhost:${PORT}`);
});
