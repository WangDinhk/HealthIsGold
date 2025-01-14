const Order = require("../models/OrderProduct");
const User = require("../models/UserModel");
const Product = require("../models/ProductModel");
module.exports = {
    createOrder: async ( userId, orderItem, shipAddress, PaymentMethod, totalPrice ) => {
        const order = new Order({
            orderItem,
            shipAddress,
            PaymentMethod,
            totalPrice,
            user: userId, 
            paidAt: new Date(),

        });
        for (const item of orderItem) {
            const product = await Product.findById(item.id);
            if (product) {
                if (product.countInStock < item.quantity) {
                    throw new Error(`Not enough stock for product: ${product.name}`);
                }
                product.countInStock -= item.amount; 
                await product.save(); 
            } else {
                throw new Error(`Product not found: ${item.productId}`);
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