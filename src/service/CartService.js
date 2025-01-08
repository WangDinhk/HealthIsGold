import axios from "axios";

export const addToCart = async (userId, productId, quantity, countInStock) => {
    if (quantity > countInStock) {
        throw new Error(`Số lượng vượt quá hàng trong kho (${countInStock})`);
    }
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/cart/add`, {
        userId,
        productId,
        quantity
    });
    return res.data;
};

export const getUserCart = async (userId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/cart/${userId}`);
    return res.data;
};

export const updateCartItem = async (userId, productId, quantity) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/cart/update`, {
        userId,
        productId,
        quantity
    });
    return res.data;
};

export const updateCartItemQuantity = async (userId, productId, quantity, countInStock) => {
    if (!quantity || quantity <= 0) {
        throw new Error('Số lượng phải lớn hơn 0');
    }
    if (quantity > countInStock) {
        throw new Error(`Số lượng vượt quá hàng trong kho (${countInStock})`);
    }
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/cart/update`, {
        userId,
        productId,
        quantity
    });
    return res.data;
};

export const removeCartItem = async (userId, productId) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/cart/remove`, {
        data: { userId, productId }
    });
    return res.data;
};

export const createMomoPayment = async (orderInfo) => {
    if (!orderInfo) {
        throw new Error(`Đơn hàng không hợp lệ`);
    }
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/payment/create-payment-momo`, orderInfo);
    return res.data;
}
