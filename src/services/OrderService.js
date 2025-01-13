const Order = require("../models/OrderProduct");
const User = require("../models/UserModel");
module.exports = {
    createOrder: async ( userId, orderItem, shipAddress, paymentMethod, totalPrice ) => {
        const order = new Order({
            orderItem,
            shipAddress,
            paymentMethod,
            totalPrice,
            user: userId, 
            paidAt: new Date(),

        });
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
        console.log(user.isAdmin);
        if (user.isAdmin ==true) {
            orders=await Order.find({});
        } else {
            orders = await Order.find({ user: userId }).populate("orderItem.product");
        }
        return orders;
    }

}