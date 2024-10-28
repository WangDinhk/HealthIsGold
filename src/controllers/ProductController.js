const ProductService = require('../services/ProductService')

// t
const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, manufacturer, ingredient, description } = req.body // Lấy thông tin được đưa vào từ req.body

        // Kiểm tra dữ liệu
        if (!name || !image || !type || !price || !countInStock || !manufacturer || !ingredient) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is require.'
            })
        }
        const response = await ProductService.createProduct(req.body) // Tạo sản phẩm
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productid = req.params.id // Lấy id của sản phẩm trong cơ sở dữ liệu
        const data = req.body // Lấy thông tin của sản phẩm trong cơ sở dữ liệu

        // Kiểm tra id được nhập vào chưa
        if (!productid) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ProductID is required.'
            })
        }
        const response = await ProductService.updateProduct(productid, data) // Cập nhật dữ liệu của một sản phẩm dựa vào id sản phẩm
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsProduct = async (req, res) => {
    try {
        const productid = req.params.id // Lấy id của sản phẩm trong cơ sở dữ liệu

        // Kiểm tra id được nhập vào chưa
        if (!productid) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ProductID is required.'
            })
        }
        const response = await ProductService.getDetailsProduct(productid) // Lấy thông tin của một sản phẩm dựa vào id sản phẩm
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const {limit,page}=req.query;
        const response = await ProductService.getAllProduct(Number(limit),Number(page));// Lấy thông tin của tất cả sản phẩm 
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productid = req.params.id // Lấy id của sản phẩm trong cơ sở dữ liệu

        // Kiểm tra id được nhập vào chưa
        if (!productid) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ProductID is required.'
            })
        }
        const response = await ProductService.deleteProduct(productid) // Xóa một sản phẩm dựa vào id sản phẩm
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}