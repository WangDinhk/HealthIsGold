const UserService = require("../services/UserService");

const createUser = async (req, res) => {
    console.log(req.body);  // Ghi log để kiểm tra dữ liệu

    const { name, email, password, confirmPassword, phone } = req.body;  
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isMail = regex.test(email);

    if (!name || !email || !password || !confirmPassword || !phone) {
        return res.status(400).json({
            status: "ERR",
            message: "All fields are required"
        });
    } else if (!isMail) {
        return res.status(400).json({
            status: "ERR",
            message: "Invalid email format"
        });
    } else if (password !== confirmPassword) {  
        return res.status(400).json({
            status: "ERR",
            message: "Passwords do not match"
        });
    }

    // Đã kiểm tra xong, gọi service để tạo user
    try {
        const resp = await UserService.createUser(req.body);  
        return res.status(201).json(resp); // Trả về mã 201 cho việc tạo thành công
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message || "Internal Server Error"
        });
    }
};

const signInUser = async (req, res) => {
    console.log(req.body);  // Ghi log để kiểm tra dữ liệu

    const { email, password } = req.body;  
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isMail = regex.test(email);

    if (!email || !password) {
        return res.status(400).json({
            status: "ERR",
            message: "Email and password are required"
        });
    } else if (!isMail) {
        return res.status(400).json({
            status: "ERR",
            message: "Invalid email format"
        });
    }

    // Đã kiểm tra xong, gọi service để đăng nhập người dùng
    try {
        const resp = await UserService.signInUser(req.body);  
        return res.status(200).json(resp); // Trả về thông tin người dùng hoặc token
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message || "Internal Server Error"
        });
    }
};

// Hàm updateUser
const updateUser = async (req, res) => {
    console.log(req.body);  // Ghi log để kiểm tra dữ liệu

    const userId = req.params.id; // Lấy ID người dùng từ tham số URL
    const { name, email, phone } = req.body;  
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isMail = regex.test(email);

    if (!userId) {
        return res.status(400).json({
            status: "ERR",
            message: "User ID is required"
        });
    } 
    if (email && !isMail) {
        return res.status(400).json({
            status: "ERR",
            message: "Invalid email format"
        });
    }

    // Đã kiểm tra xong, gọi service để cập nhật người dùng
    try {
        const resp = await UserService.updateUser(userId, req.body);  
        return res.status(200).json(resp); // Trả về thông tin người dùng đã cập nhật
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message || "Internal Server Error"
        });
    }
};

module.exports = {
    createUser, 
    signInUser,
    updateUser
};
