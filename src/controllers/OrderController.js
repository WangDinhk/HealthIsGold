const OrderService = require("../services/OrderService");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports= {
    createOrder: async (req,res) => {
        const decoded = jwt.verify( req.cookies.refreshToken, process.env.REFRESH_TOKEN);
        const userId = decoded.id;
        const {  orderItem, shipAddress, paymentMethod, totalPrice } = req.body;
        await OrderService.createOrder ( userId, orderItem, shipAddress, paymentMethod, totalPrice );
        return res.status(200).json({
            message: "Create order success"
        })
    },
    getAllOrder: async (req,res) => {

    },
    getDetailOrder: async (req,res) => {

    }
}