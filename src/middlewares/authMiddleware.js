const jwt = require("jsonwebtoken");
const config = require('../config/config');

async function verifyToken(req, res, next) {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({ code: 401, message: 'Yetkisiz: Token eksik.' })
        }

        const decoded = jwt.verify(token, config.jwtSecret);

        req.user = {
            ID: decoded.ID,
            role: decoded.role
        }

        
        next();


    } catch (err) {
        if(err.name == 'TokenExpiredError'){
            return res.status(401).json({ code: 401, message: 'Yetkisiz: Token süresi dolmuş.' });
        }
        
        return res.status(401).json({ code: 401, message: 'Yetkisiz: Geçersiz token.' });
    }
}

module.exports = verifyToken;