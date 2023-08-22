import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import cartReducer from "./Slices/cartSlice"
import alertReducer from "./Slices/alertSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    alert: alertReducer
  },
});

export default store;