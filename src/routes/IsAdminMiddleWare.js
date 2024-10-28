const jwt = require('jsonwebtoken');
require('dotenv').config();

const IsAdminMiddleWare =(req, res, next) => {
    try {
        const token = req.headers.token.split(' ')[1];
        if(!token){
            return res.status(200).json({
            status:"ERR",
            message:"The token is required"
        })
        }
        const decoded =jwt.verify(token, process.env.ACCESS_TOKEN);
        if(decoded.payload?.isAdmin){
            next();
        }
        else{
            return res.status(400).json({
                status:'ERR',
                message:'Access denied. Admin only.'
            })
        }
       
    } catch (e) {
        console.log(e.message);
        return res.status(400).json({
            status: 'ERR',
            message: e.message,
        });
    }
};


module.exports = IsAdminMiddleWare;
