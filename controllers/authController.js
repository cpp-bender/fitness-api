const User = require('../models/User');
const bcrypt = require('bcrypt');

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
        access_token: token,
        data: {
            name: user.name,
            email: user.email
        },
        mes: "its fine"
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
    return res.status(200)
    .cookie('accessToken', token, 
    { 
        httpOnly: true,
        secure: NODE_ENV === "development" ? false : true,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000),
    })
    .json({mess:"designing login func.", user})

};

module.exports = {
    register,
    login,
};