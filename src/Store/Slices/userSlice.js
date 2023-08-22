import {createSlice} from "@reduxjs/toolkit" 

const userSlice = createSlice({
    name: "user",
    initialState:{
        user: {
            user_id:"",
            name:"",
            token:"",
            logged:false
        }
    },
    reducers:{
        login: (state, action) =>{
            state.user = action.payload
        },
        logout: (state) =>{
            state.user = {
                user_id:"",
                name:"",
                token:"",
                logged:false
            }
        }
    }
})

export const {login, logout} = userSlice.actions
export const selectUser = (state) => state.user.user

export default userSlice.reducer