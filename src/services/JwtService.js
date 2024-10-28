const jwt = require('jsonwebtoken');
require('dotenv').config();

const genneralAccessToken = (payload) => {
    const accessToken = jwt.sign({ payload }, process.env.ACCESS_TOKEN, { expiresIn: '30s' });
    return accessToken;
};

const genneralRefreshToken = (payload) => {
    const refreshToken = jwt.sign({ payload }, process.env.REFRESH_TOKEN, { expiresIn: '365d' });
    return refreshToken;
};

const refreshToken= (token) =>{
    try{
        const decoded=jwt.verify(token,process.env.REFRESH_TOKEN);
        const newAccessToken=genneralAccessToken({
            id:decoded.payload?.id,
            isAdmin:decoded.payload?.isAdmin
        })
        console.log(newAccessToken);
        return {
            status:"OK",
            message:"Success"
        }
    }
    catch(e){
        return {
            status:"ERR",
            message:"Authemtication"
        }
    }
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshToken
};
