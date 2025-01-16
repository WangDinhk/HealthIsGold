const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItem: [
        {
            name: { type: String, required: true},
            quantity: { type: Number, required: true},
            image: { type: String, required: true},
            price: { type: Number, required: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
    ],
    shipAddress: { type: String, required: true},
    PaymentMethod: { type: String, required: true},
    totalPrice: { type: Number, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    paidAt: { type: Date},
    phone: { type: String, required:true},
    status: { type: String, default:'Chưa xác nhận'},
    name :{ type: String, required:true}
},
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order