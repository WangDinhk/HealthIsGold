 import { createSlice } from "@reduxjs/toolkit"
 const initialState={
 orderItem: [
    ],
    shipAddress: '',
    PaymentMethod:'',
    totalPrice: 0,
    user: '',
    paidAt:'',
}
export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        
    },
})

// Action creators are generated for each case reducer function
export const { createOrder } = orderSlide.actions

export default orderSlide.reducer
