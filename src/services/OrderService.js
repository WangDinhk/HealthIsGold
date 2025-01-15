const Order = require("../models/OrderProduct");
const User = require("../models/UserModel");
const Product = require("../models/ProductModel");
module.exports = {
    createOrder: async ( userId, orderItem, shipAddress, PaymentMethod, totalPrice, phone) => {
        const order = new Order({
            orderItem,
            shipAddress,
            PaymentMethod,
            totalPrice,
            user: userId, 
            paidAt: new Date(),
            phone

        });
        for (const item of orderItem) {
            // const product = await Product.findById(item.product);
            const product = await Product.findById(item.product);
            if (product) {
                if (product.countInStock < item.quantity) {
                    throw new Error(`Not enough stock for product: ${product.name}`);
                }
                console.log(product.countInStock);
                product.countInStock -= item.quantity; 
                await product.save(); 
            } else {
                throw new Error(`Product not found: ${item.product}`);
            }
        }
        await order.save();
    },
    
    getAllOrder: async (userId) => {
        const user = await User.findById(userId);
        if (!user) {
            return {
                status: "ERR",
                message: "User không tồn tại",
            };
        }
        let orders;
        if (user.isAdmin ==true) {
            orders=await Order.find({});
        } else {
            orders = await Order.find({ user: userId }).populate("orderItem.product");
        }
        return orders;
    },
    
    getDetailOrder: async (id) => {
        const order = await Order.findById(id).populate("orderItem.product"); 
        return order;
    }

}