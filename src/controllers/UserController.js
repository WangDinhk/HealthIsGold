const UserService = require("../services/UserService");
const JWTService = require("../services/JwtService");
const { OAuth2Client } = require('google-auth-library');

const { response } = require("express");
const createUser = async (req, res) => {
  const { name, email, password, confirmPassword, phone } = req.body;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isMail = regex.test(email);

  //if (!name || !email || !password || !confirmPassword || !phone) {

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({
      status: "ERR",
      message: "All fields are required",
    });
  } else if (!isMail) {
    return res.status(400).json({
      status: "ERR",
      message: "Invalid email format",
    });
  } else if (password !== confirmPassword) {
    return res.status(400).json({
      status: "ERR",
      message: "Passwords do not match",
    });
  }

  // Đã kiểm tra xong, gọi service để tạo user
  try {
    const resp = await UserService.createUser(req.body);
    return res.status(201).json(resp); // Trả về mã 201 cho việc tạo thành công
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Internal Server Error",
    });
  }
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isMail = regex.test(email);

  if (!email || !password) {
    return res.status(400).json({
      status: "ERR",
      message: "Email and password are required",
    });
  } else if (!isMail) {
    return res.status(400).json({
      status: "ERR",
      message: "Invalid email format",
    });
  }

  // Đã kiểm tra xong, gọi service để đăng nhập người dùng
  try {
    const resp = await UserService.signInUser(req.body);
    const { refreshToken, ...newReponse } = resp;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // httpOnly: false, //TEST

      secure: false,
      samesite: "strict",
    });
    console.log("Cookie sent:", refreshToken);

    return res.status(200).json(newReponse); // Trả về thông tin người dùng hoặc token
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Internal Server Error",
    });
  }
};

// Hàm updateUser
const updateUser = async (req, res) => {
  const userId = req.params.id; // Lấy ID người dùng từ tham số URL
  const { name, email, phone } = req.body;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isMail = regex.test(email);

  if (!userId) {
    return res.status(400).json({
      status: "ERR",
      message: "User ID is required",
    });
  }
  if (email && !isMail) {
    return res.status(400).json({
      status: "ERR",
      message: "Invalid email format",
    });
  }

  // Đã kiểm tra xong, gọi service để cập nhật người dùng
  try {
    const resp = await UserService.updateUser(userId, req.body);
    return res.status(200).json(resp); // Trả về thông tin người dùng đã cập nhật
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Internal Server Error",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId === null) {
      return res.status(400).json({
        status: "ERR",
        message: "The user ID is required",
      });
    }
    const respond = await UserService.deleteUser(userId);
    return res.status(200).json(respond);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message,
    });
  }
};
const getAllUser = async (req, res) => {
  try {
    const respond = await UserService.getAllUser();
    return res.status(200).json(respond);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message,
    });
  }
};
const getDetailUser = async (req, res) => {
  try {
    const id = req.params.id;
    const respond = await UserService.getDetailUser(id);
    return res.status(200).json(respond);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message,
    });
  }
};
const refreshToken = (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const respond = JWTService.refreshToken(token);
    res.status(200).json(respond);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message,
    });
  }
};


const logoutUser = (req, res) => {
  try {
    res.clearCookie(`refreshToken`)
    return res.status(200).json({
      status: `OK`,
      message:` Logout successfully`
    })
   
    
  } catch (e) {
    return res.status(404).json({
      message: e
    });
  }
};
const client_id= process.env.GG_CLIENT_ID;
const client = new OAuth2Client(client_id);
async function verifyToken(token) {
const ticket = await client.verifyIdToken({
  idToken: token,
  audience: client_id,
})
const payload = ticket.getPayload();
return payload;
};

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ status: "ERR", message: "Token is required" });
    }
    // Verify the Google token
    const payload = await verifyToken(token);
    let user = await UserService.findUserByEmail(payload.email);
    // If user does not exist, create a new user
    if (!user) {
      user = await UserService.createUser({
        email: payload.email,
        name: payload.name || "No Name",
        password: token, // Password is empty as it is Google login
        phone: '', // You can customize how phone number is handled
      });
    }
    console.log('USER',user);
    // Generate access and refresh tokens
    const accessToken = JWTService.genneralAccessToken({ id: user._id, isAdmin: user.isAdmin });
    const refreshToken = JWTService.genneralRefreshToken({ id: user._id, isAdmin: user.isAdmin });
    // Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production if using https
      sameSite: "strict",
    });
    
    // Return response with user data and access token
    return res.status(200).json({
      status: "OK",
      message: "User signed in successfully",
      data: user,
      accessToken, // Send the access token to the client
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: "ERR", message: e.message || "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  signInUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  refreshToken,
  logoutUser,
  googleLogin
};
