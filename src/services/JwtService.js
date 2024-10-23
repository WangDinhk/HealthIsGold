const jwt = require('jsonwebtoken');

// Lấy khóa bí mật từ biến môi trường
const JWT_SECRET = process.env.JWT_SECRET; // Khóa bí mật cho Access Token
const REFRESH_SECRET = process.env.REFRESH_SECRET; // Khóa bí mật cho Refresh Token

// Kiểm tra xem JWT_SECRET và REFRESH_SECRET có tồn tại không
if (!JWT_SECRET || !REFRESH_SECRET) {
    throw new Error('JWT_SECRET or REFRESH_SECRET is not defined in the environment variables.');
}

// Thời gian sống của token
const JWT_EXPIRATION = '1h'; // Thời gian sống của Access Token
const REFRESH_EXPIRATION = '100d'; // Thời gian sống của Refresh Token

// Hàm tạo Access Token
const createAccessToken = (userId, isAdmin) => {
    const payload = {
        id: userId,
        isAdmin: isAdmin
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return token;
};

// Hàm tạo Refresh Token
const createRefreshToken = (userId) => {
    const payload = {
        id: userId
    };
    const token = jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRATION });
    return token;
};

// Hàm xác thực Access Token
const verifyAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded; // Trả về thông tin đã giải mã
    } catch (e) {
        return null; // Nếu token không hợp lệ hoặc đã hết hạn
    }
};

// Hàm xác thực Refresh Token
const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, REFRESH_SECRET);
        return decoded; // Trả về thông tin đã giải mã
    } catch (e) {
        return null; // Nếu token không hợp lệ hoặc đã hết hạn
    }
};

module.exports = {
    createAccessToken,
    createRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};
