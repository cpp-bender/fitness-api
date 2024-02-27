const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/',(req, res) => {
    const name = req.body.name;
    res.send(name);
});

router.post('/createUser', async(req, res) =>{
    const user = await User.create(req.body);
    res.status(201).json({success: true, user: user});
});


module.exports = router;