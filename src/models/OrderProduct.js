const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItem: [
        {
            name: { type: String, require: true},
            amount: { type: Number, require: true},
            image: { type: String, require: true},
            price: { type: Number, require: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                require: true,
            },
        },
    ],
    shipAddress: { type: String, require: true},
    PaymentMethod: { type: String, require: true},
    totalPrice: { type: Number, require: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    paidAt: { type: Date},
    phone: { type: String, require:true},
    status: { type: String, default:'Chưa xác nhận'},
    name :{ type: String, require:true}
},
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order