const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {register, login} = require('../controllers/authController');

router.get('/',(req, res) => {
    const name = req.body.name;
    res.send(name);
});

router.post('/createUser', register);

router.post('/login', login);


module.exports = router;