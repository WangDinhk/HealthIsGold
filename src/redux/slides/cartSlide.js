import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalAmount: 0,
    loading: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCartSuccess: (state, action) => {
            state.cartItems = action.payload.items;
            state.totalAmount = action.payload.totalAmount;
        },
        updateCartSuccess: (state, action) => {
            state.cartItems = action.payload.items;
            state.totalAmount = action.payload.totalAmount;
        },
        setLoadingCart: (state, action) => {
            state.loading = action.payload;
        },
        removeFromCartSuccess: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.product._id !== action.payload);
            state.totalAmount = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        },
        updateQuantitySuccess: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.cartItems.find(item => item.product._id === productId);
            if (item && quantity <= item.product.countInStock) {
                item.quantity = quantity;
                state.totalAmount = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            }
        }
    }
});

export const { 
    addToCartSuccess, 
    updateCartSuccess, 
    setLoadingCart,
    removeFromCartSuccess,
    updateQuantitySuccess 
} = cartSlice.actions;
export default cartSlice.reducer;
