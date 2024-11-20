require('dotenv').config();  
const bcrypt = require('bcrypt');
const User = require("../models/UserModel");
const token=require("./JwtService")
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
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10); 
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
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                status: "ERR",
                message: "Incorrect password"
            };
        }
        const accessToken =token.genneralAccessToken({
            id: user.id,
            isAdmin:user.isAdmin
        });

        const refreshToken = token.genneralRefreshToken({
            id: user.id,
            isAdmin: user.isAdmin
        });
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
const deleteUser =async(id) => {
    try{
      const checkUser=await User.findOne({
        _id:id
      })
      if(!checkUser){
        return {
            status: "ERR",
            message: "The user is not defined"
        };
      }
      await User.findByIdAndDelete(id);
      return {
        status:"OK",
        message:"Delete Success"
      }
    }
    catch(e){
        return {
            status: "ERR",
            message: e.message
        };
    }
}
const getAllUser =async () =>{
    try{
        const allUser=await User.find();
        return {
            status:"Ok",
            message:"Succces",
            data:allUser
        }
    }
    catch(e){
        return {
            status: "ERR",
            message: e.message
        };
    }
}
const getDetailUser=async(id) =>{
    try{
        const user=await User.findOne({
            _id:id
        })
        return {
            status:"Ok",
            message:"Succces",
            data:user
        } 
    }
    catch(e){
        return {
            status: "ERR",
            message: e.message
        };
    }
}

module.exports = {
    createUser,
    signInUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser
};
