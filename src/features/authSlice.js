import { createSlice,nanoid } from "@reduxjs/toolkit";


const initialState={
    status:false,
    userData:null
}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
             if (!action.payload?.$id) {
                alert("Invalid login payload: missing $id", action.payload);
                }
            state.status=true
            state.userData=action.payload
        },
        logout:(state)=>{
            state.status=false
            state.userData=null
        }
    }
})

export const {login,logout}=authSlice.actions
export default authSlice.reducer