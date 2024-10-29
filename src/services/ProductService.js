const Product = require('../models/ProductModel')

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, manufacturer, ingredient, description } = newProduct

        try {
            const checkProduct = await Product.findOne({
                name: name
            })

            // Kiểm tra sản phẩm đã tồn tại hay chưa
            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name of the product is existed.'
                })
            }

            // Tạo sản phẩm mới
            const createNewProduct = await Product.create({
                name, image, type, price, countInStock, manufacturer, ingredient, description
            })

            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createNewProduct
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })

            // Kiểm tra sản phẩm có tồn tại không
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not define.'
                })
            }

            // Cập nhật thông tin sản phẩm
            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })

            // Kiểm tra sản phẩm có tồn tại không
            if (product === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not define.'
                })
            }

            // Xuât thông tin sản phẩm
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct = async (currentPage, sortOption, filter) => {
    try {
        const limit = 8;
        const totalProduct = await Product.countDocuments();
        const totalPage = Math.ceil(totalProduct / limit);
        if (currentPage > totalPage) {
            return {
                status: "Ok",
                message: "Don't have product"
            };
        }
        const filterOptions = {};
        if (filter) {
            const regex = new RegExp(filter, "i");
            filterOptions.name = regex; 
        }
        const allProduct = sortOption ? await Product.find(filterOptions).limit(limit).skip((currentPage - 1) * limit).sort({
            [sortOption[0]]: sortOption[1]
         }) 
            : await Product.find(filterOptions).limit(limit).skip((currentPage - 1) * limit);
        return {
            status: "Ok",
            message: "Success",
            data: allProduct,
            totalPage: totalPage
        };
    } catch (e) {
        return {
            status: "ERR",
            message: e.message
        };
    }
};
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })

            // Kiểm tra sản phẩm có tồn tại không 
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not define.'
                })
            }

            // Xóa sản phẩm
            await Product.findByIdAndDelete(id)

            resolve({
                status: 'OK',
                message: 'DELETE PRODUCT SUCCESS'
            })

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}