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
        }
    }
});

export const { addToCartSuccess, updateCartSuccess, setLoadingCart } = cartSlice.actions;
export default cartSlice.reducer;
