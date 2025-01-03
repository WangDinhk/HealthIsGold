import axios from "axios";

export const addToCart = async (userId, productId, quantity) => {
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
