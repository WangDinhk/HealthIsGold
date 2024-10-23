require('dotenv').config();  // Nạp các biến môi trường từ file .env
const bcrypt = require('bcrypt');
const User = require("../models/UserModel");
const { createToken, createRefreshToken, createAccessToken } = require('./JwtService');

const createUser = async ({ name, email, password, phone }) => {
    try {
        // Kiểm tra xem email đã tồn tại hay chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return {
                status: "ERR",
                message: "Email already exists"
            };
        }

        // Lấy số lần salt từ biến môi trường
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);  // Chuyển đổi thành số nguyên
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Tạo user trong database với mật khẩu đã mã hóa
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,  // Lưu mật khẩu đã mã hóa
            phone
        });

        return {
            status: "OK",
            message: "User created successfully",
            data: newUser
        };
    } catch (e) {
        return {
            status: "ERR",
            message: "Error creating user",
            error: e.message
        };
    }
};


const signInUser = async ({ email, password }) => {
    try {
        // Tìm người dùng theo email
        const user = await User.findOne({ email });
        if (!user) {
            return {
                status: "ERR",
                message: "Email not found"
            };
        }

        // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                status: "ERR",
                message: "Incorrect password"
            };
        }
        const accessToken = createAccessToken(user._id, user.isAdmin);
        const refreshToken = createRefreshToken(user._id, user.isAdmin);
        // Nếu thông tin đăng nhập hợp lệ, trả về thông tin người dùng (có thể bao gồm token nếu cần)
        return {
            status: "OK",
            message: "Sign in successful",
            accessToken,
            refreshToken
        };
    } catch (e) {
        return {
            status: "ERR",
            message: "Error signing in",
            error: e.message
        };
    }
};

const updateUser = async (userId, userData) => {
    try {
        // Tìm người dùng theo ID và cập nhật thông tin
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
        
        if (!updatedUser) {
            return {
                status: "ERR",
                message: "User not found"
            };
        }

        return {
            status: "OK",
            message: "User updated successfully",
            data: updatedUser
        };
    } catch (e) {
        return {
            status: "ERR",
            message: "Error updating user",
            error: e.message
        };
    }
};


module.exports = {
    createUser,
    signInUser,
    updateUser
};
