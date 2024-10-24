const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true, unique: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        manufacturer: { type: String, required: true },
        ingredient: [{ name: { type: String, required: true }, _id: false }],
        description: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema)

module.exports = Product