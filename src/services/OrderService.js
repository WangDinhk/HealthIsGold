const Order = require("../models/OrderProduct");
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
        if (user.role === "admin") {
            orders = await Order.find({}).populate("user").populate("orderItem.product");
        } else {
            orders = await Order.find({ user: userId }).populate("orderItem.product");
        }
    }

}