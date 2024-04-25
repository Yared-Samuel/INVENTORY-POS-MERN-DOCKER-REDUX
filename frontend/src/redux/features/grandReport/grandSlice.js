import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import grandService from "./grandService";
import { toast } from "react-toastify";

const initialState = {
    grand: null,
    grands: [],
    grandIsError: false,
    grandIsSuccess: false,
    grandIsLoading: false,
    message: ""
}

// Create New sprice



export const getGrandId = createAsyncThunk(
    "grand/ID",
    async ({_id}, thunkAPI)=>{
        try {
            return await grandService.getGrandId(_id)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)



// sprice slice

const grandSlice = createSlice({
    name: 'grand',
    initialState,
    reducers: {
        CALC_GRAND_VALUE(state, action) {
            console.log("sprice value")
        }
    },

    extraReducers: (builder)=>{
        builder
     
          .addCase(getGrandId.pending, (state)=>{
            state.grandIsLoading = true
          })
          .addCase(getGrandId.fulfilled, (state, action)=>{
            state.grandIsLoading = false;
            state.grandIsSuccess = true;
            state.grandIsError = false;
            state.grands = action.payload
    
          })
          .addCase(getGrandId.rejected, (state, action)=>{
            state.grandIsLoading = false;
            state.grandIsLoading = true;
            state.message = action.payload
            toast.error(action.payload)
    
          })
      }

})



export const {CALC_GRAND_VALUE} = grandSlice.actions
export const selectIsLoading = (state) => state.grand.grandIsLoading

export default grandSlice.reducer