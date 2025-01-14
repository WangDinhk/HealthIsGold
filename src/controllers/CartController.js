const CartService = require('../services/CartService');

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        
        if (!userId || !productId || !quantity) {
            return res.status(400).json({
                status: "ERR",
                message: "Missing required fields"
            });
        }

        const response = await CartService.addToCart(userId, productId, quantity);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message
        });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        
        if (!userId || !productId || quantity === undefined) {
            return res.status(400).json({
                status: "ERR",
                message: "Missing required fields"
            });
        }

        const response = await CartService.updateCartItem(userId, productId, quantity);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message
        });
    }
};

const getUserCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        if (!userId) {
            return res.status(400).json({
                status: "ERR",
                message: "User ID is required"
            });
        }

        const response = await CartService.getUserCart(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message
        });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        
        if (!userId || !productId) {
            return res.status(400).json({
                status: "ERR",
                message: "Missing required fields"
            });
        }

        const response = await CartService.removeFromCart(userId, productId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message
        });
    }
};
const deleteCart = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                status: "ERR",
                message: "User ID is required",
            });
        }

        const response = await CartService.deleteCart(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message,
        });
    }
};

module.exports = {
    addToCart,
    updateCartItem,
    getUserCart,
    removeFromCart,
    deleteCart, // Thêm hàm mới
};



