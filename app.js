require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// routers
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT, ()=>{
    console.log(`app started at http://localhost:${PORT}`);
});
