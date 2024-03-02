const router = require('express').Router();
const {register, login, showProfile} = require('../controllers/authController');
const {getAccessToRoute} = require('../middlewares/authorization/authMiddleware');

// get requests
router.get('/',(req, res) => {
    const name = req.body.name;
    res.send(name);
});
router.get('/myProfile', getAccessToRoute, showProfile);

// post requests
router.post('/createUser', register);
router.post('/login', login);

module.exports = router;