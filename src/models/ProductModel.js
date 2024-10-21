const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, require: true},
        image: { type: String, require: true, unique: true},
        type: { type: String, require: true},
        price: { type: Number, require: true},
        countInStock: { type: Number, require: true},
        manufacturer: { type: String, require: true},
        ingredient: [{name: String, require: true}],
        description: { type: String, require: true},
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', userSchema)

module.exports = Product