const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async(req, res) =>{
    const user = await User.create(req.body);
    const token = user.generateJwtFromUser();
    const {JWT_COOKIE, NODE_ENV} = process.env;
    return res
    .status(200)
    .cookie('accessToken', token, 
    { 
        httpOnly: true,
        secure: NODE_ENV === "development" ? false : true,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000),
    })
    .json({
        success: true,
        token,
        data: {
            name: user.name,
            email: user.email
        },
        mess: "registered successfully"
    })
};

const login = async(req, res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email}).select('+password');
    const err = await bcrypt.compare(password, user.password);

    if(!err){
        return res.status(401).json({status: false, mess: "wrong password"});
    }

    const token = user.generateJwtFromUser(); 
    const {JWT_COOKIE, NODE_ENV} = process.env;
    return res
    .status(200)
    .cookie('accessToken', token, 
    { 
        httpOnly: true,
        secure: NODE_ENV === "development" ? false : true,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000),
    })
    .json({mess:"logged in succesfully", user, token});
};

const showProfile = async(req, res) => {
    const token = req.headers.authorization.split(',')[1];
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    console.log(token);
    jwt.verify(token, SECRET_KEY, function(err, decoded) {
        if(err){
            return res.status(401).json({mess: "error occurred"});
        }
        res.status(200).json({mess: "profile details", decoded});
    });
};

module.exports = {
    register,
    login,
    showProfile,
};