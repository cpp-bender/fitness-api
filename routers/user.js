const router = require('express').Router();
const {register, login, showProfile} = require('../controllers/authController');

// get requests
router.get('/',(req, res) => {
    const name = req.body.name;
    res.send(name);
});
router.get('/myProfile', showProfile);

// post requests
router.post('/createUser', register);
router.post('/login', login);

module.exports = router;