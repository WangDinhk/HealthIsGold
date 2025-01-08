const ProductService = require("../services/ProductService");

// t
const createProduct = async (req, res) => {
    try {
        const {
            name,
            image,
            type,
            price,
            discount,
            countInStock,
            manufacturer,
            description,
            unit,
            country,
            target,
            quantity,
            ingredient,
        } = req.body; // Lấy thông tin được đưa vào từ req.body

        if (!name || !image || !type || !price || !countInStock || !manufacturer || 
            !unit || !country || !target || !quantity || !ingredient || 
            !description) {
            return res.status(200).json({
                status: "ERR",
                message: "The input is require.",
            });
        }
        const response = await ProductService.createProduct(req.body); // Tạo sản phẩm
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productid = req.params.id; // Lấy id của sản phẩm trong cơ sở dữ liệu
        const data = req.body; // Lấy thông tin của sản phẩm trong cơ sở dữ liệu

        // Kiểm tra id được nhập vào chưa
        if (!productid) {
            return res.status(200).json({
                status: "ERR",
                message: "The ProductID is required.",
            });
        }
        const response = await ProductService.updateProduct(productid, data); // Cập nhật dữ liệu của một sản phẩm dựa vào id sản phẩm
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getDetailsProduct = async (req, res) => {
    try {
        const productid = req.params.id; // Lấy id của sản phẩm trong cơ sở dữ liệu

        // Kiểm tra id được nhập vào chưa
        if (!productid) {
            return res.status(200).json({
                status: "ERR",
                message: "The ProductID is required.",
            });
        }
        const response = await ProductService.getDetailsProduct(productid); // Lấy thông tin của một sản phẩm dựa vào id sản phẩm
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        // Extract filter params from query string
        const filters = {
            manufacturer: req.query.manufacturer?.split(','),
            country: req.query.country?.split(','),
            discount: req.query.discount ? Number(req.query.discount) : null,
            priceRange: req.query.priceRange?.split('-').map(Number),
            target: req.query.target?.split(',')
        };

        const response = await ProductService.getAllProduct(
            Number(page),
            Number(limit),
            null, // sort option
            filters
        );
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productid = req.params.id; // Lấy id của sản phẩm trong cơ sở dữ liệu

        // Kiểm tra id được nhập vào chưa
        if (!productid) {
            return res.status(200).json({
                status: "ERR",
                message: "The ProductID is required.",
            });
        }
        const response = await ProductService.deleteProduct(productid); // Xóa một sản phẩm dựa vào id sản phẩm
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getProductsByType = async (req, res) => {
    try {
        const type = req.params.type;
        if (!type) {
            return res.status(200).json({
                status: "ERR",
                message: "Product type is required"
            });
        }
        const response = await ProductService.getProductsByType(type);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

const getFilterOptions = async (req, res) => {
    try {
        const response = await ProductService.getFilterOptions();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
};

const testFilters = async (req, res) => {
    try {
        const data = await ProductService.testFilterOptions();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    getProductsByType, // Add this new export
    getFilterOptions,
    testFilters
};
