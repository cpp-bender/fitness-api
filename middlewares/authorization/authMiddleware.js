const jwt = require('jsonwebtoken');

const getAccessToRoute = (req, res, next) => {
    const token = req.headers.authorization.split(':')[1];
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    jwt.verify(token, SECRET_KEY, function(err, decoded) {
        if(err){
            return res.status(401).json({mess: "error occurred"});
        }
        req.user = {
            id: decoded.id,
            name: decoded.name,
        } 
    });

    next();
}

module.exports = {
    getAccessToRoute,
}