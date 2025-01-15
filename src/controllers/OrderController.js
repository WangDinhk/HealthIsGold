const OrderService = require("../services/OrderService");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports= {
    createOrder: async (req,res) => {
        const decoded = jwt.verify( req.cookies.refreshToken, process.env.REFRESH_TOKEN);
        const userId = decoded.id;
        const {  orderItem, shipAddress, PaymentMethod, totalPrice, phone, name } = req.body;
        await OrderService.createOrder ( userId, orderItem, shipAddress, PaymentMethod, totalPrice, phone, name );
        return res.status(200).json({
            message: "Create order success"
        })
    },
    getAllOrder: async (req,res) => {
        const decoded = jwt.verify( req.cookies.refreshToken, process.env.REFRESH_TOKEN);
        const userId = decoded.id;
        const data=await OrderService.getAllOrder (userId);
        return res.status(200).json({
            messgage:"Ok",
            data:data
        })
    },
    getDetailOrder: async (req,res) => {
        const id = req.params.id;
        const data=await OrderService.getDetailOrder(id);
        return res.status(200).json({
            messgage:"Ok",
            data:data
        })
    },
    
    updateOrder: async (req,res) => {
        const id = req.params.id;
        await OrderService.updateOrder(id);
        return res.status(200).json({
            messgage:"Ok",
        })
    }
}