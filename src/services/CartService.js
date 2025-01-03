const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");

const createCart = async (userId) => {
    try {
        const existingCart = await Cart.findOne({ userId, status: 'active' });
        if (existingCart) {
            return {
                status: "ERR",
                message: "User already has an active cart"
            };
        }

        const newCart = await Cart.create({
            userId,
            items: [],
            totalAmount: 0
        });

        return {
            status: "OK",
            message: "Cart created successfully",
            data: newCart
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const addToCart = async (userId, productId, quantity) => {
    try {
        let cart = await Cart.findOne({ userId, status: 'active' });
        const product = await Product.findById(productId);

        if (!product) {
            return {
                status: "ERR",
                message: "Product not found"
            };
        }

        if (!cart) {
            cart = await Cart.create({
                userId,
                items: [],
                totalAmount: 0
            });
        }

        const existingItemIndex = cart.items.findIndex(item => 
            item.product.toString() === productId
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
            cart.items[existingItemIndex].totalPrice = 
                cart.items[existingItemIndex].quantity * product.price;
        } else {
            cart.items.push({
                product: productId,
                quantity: quantity,
                price: product.price,
                totalPrice: quantity * product.price
            });
        }

        await cart.save();

        return {
            status: "OK",
            message: "Item added to cart successfully",
            data: cart
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const updateCartItem = async (userId, productId, quantity) => {
    try {
        const cart = await Cart.findOne({ userId, status: 'active' });
        if (!cart) {
            return {
                status: "ERR",
                message: "Cart not found"
            };
        }

        const itemIndex = cart.items.findIndex(item => 
            item.product.toString() === productId
        );

        if (itemIndex === -1) {
            return {
                status: "ERR",
                message: "Item not found in cart"
            };
        }

        if (quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
            cart.items[itemIndex].totalPrice = quantity * cart.items[itemIndex].price;
        }

        await cart.save();

        return {
            status: "OK",
            message: "Cart updated successfully",
            data: cart
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const getUserCart = async (userId) => {
    try {
        const cart = await Cart.findOne({ userId, status: 'active' })
            .populate('items.product');
        
        if (!cart) {
            return {
                status: "OK",
                message: "No active cart found",
                data: null
            };
        }

        return {
            status: "OK",
            message: "Cart retrieved successfully",
            data: cart
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

const removeFromCart = async (userId, productId) => {
    try {
        const cart = await Cart.findOne({ userId, status: 'active' });
        if (!cart) {
            return {
                status: "ERR",
                message: "Cart not found"
            };
        }

        cart.items = cart.items.filter(item => 
            item.product.toString() !== productId
        );

        await cart.save();

        return {
            status: "OK",
            message: "Item removed from cart successfully",
            data: cart
        };
    } catch (e) {
        throw new Error(e.message);
    }
};

module.exports = {
    createCart,
    addToCart,
    updateCartItem,
    getUserCart,
    removeFromCart
};
