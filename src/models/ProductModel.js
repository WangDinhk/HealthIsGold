const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true, unique: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        manufacturer: { type: String, required: true },     //Hãng sản xuất
        description: { type: String, required: true },
        unit: {type: String, required: true},   //Đơn vị tính
        country: {type: String, required: true},    //Xuất xứ
        target: {type: String, required: true}, //Đối tượng sử dụng
        quantity: {type: String, required: true},   //Dung tích
        ingredient: {type: String, required: true}, //Thành phần
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema)

module.exports = Product