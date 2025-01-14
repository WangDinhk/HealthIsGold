import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './slides/counterSlide'
import { userReducer } from './slides/userSlide'
import cartReducer from './slides/cartSlide'  // Change this line - import default export
import orderReducer from './slides/orderSlide';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
  },
})