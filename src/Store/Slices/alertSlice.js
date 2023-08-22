import {createSlice} from "@reduxjs/toolkit" 

const alertSlice = createSlice({
    name: "alert",
    initialState: {
        alert:{
            open: false,
            severity:"info",
            message:""
        }
    },
    reducers:{
        on: (state, action) =>{
            state.alert = action.payload
        },
        off: (state,action) =>{
            state.alert = action.payload
        }
    }
})

export const {on, off} = alertSlice.actions
export const selectAlert = (state) => state.alert.alert

export default alertSlice.reducer