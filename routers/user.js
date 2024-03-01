const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {register, login, profileDetails} = require('../controllers/authController');

// get requests
router.get('/',(req, res) => {
    const name = req.body.name;
    res.send(name);
});
router.get('/myProfile', profileDetails);

// post requests
router.post('/createUser', register);
router.post('/login', login);

module.exports = router;