import {createSlice} from "@reduxjs/toolkit" 

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart:[]
    },
    reducers:{
        add: (state, action) =>{
            console.log(action)
            state.cart = action.payload
        },
        remove: (state, action) =>{
            state.cart = state.cart.splice(action.payload)
        }
    }
})

export const {add, remove} = cartSlice.actions
export const selectCart = (state) => state.cart.cart

export default cartSlice.reducer