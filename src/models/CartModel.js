const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },    // Store price at time of adding to cart
    totalPrice: { type: Number, required: true } // price * quantity
});

const cartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [cartItemSchema],
        totalAmount: { type: Number, default: 0 },
        status: { type: String, default: 'active' }  // active, completed, abandoned
    },
    {
        timestamps: true
    }
);

// Calculate total amount before saving
cartSchema.pre('save', function(next) {
    this.totalAmount = this.items.reduce((total, item) => total + item.totalPrice, 0);
    next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
