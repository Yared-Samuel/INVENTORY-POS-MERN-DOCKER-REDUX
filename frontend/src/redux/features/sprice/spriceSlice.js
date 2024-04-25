import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import spriceService from './spriceService'
import { toast } from "react-toastify";

const initialState = {
    sprice: null,
    sprices: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Create New sprice

export const createSprice = createAsyncThunk(
    "sprice/create",
    async (formData, thunkAPI) => {
        try {
            return await spriceService.createSprice(formData)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get All sprice

export const getSprices = createAsyncThunk(
    "sprice/getAll",
    async (_, thunkAPI)=>{
        try {
            return await spriceService.getSprices()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)
// Get All sprice

export const updateSprice = createAsyncThunk(
  "sprice/Update",
  async ({ _id, formData }, thunkAPI) => {
    try {
      return await spriceService.updateSprice(_id, formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);




// sprice slice

const spriceSlice = createSlice({
    name: 'sprice',
    initialState,
    reducers: {
        CALC_SPRICE_VALUE(state, action) {
            console.log("sprice value")
        }
    },

    extraReducers: (builder)=>{
        builder
          .addCase(createSprice.pending, (state)=>{
            state.isLoading = true
          })
          .addCase(createSprice.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.sprices.push(action.payload);
            toast.success("Product added successfully!")
    
          })
          .addCase(createSprice.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            toast.error(action.payload)
    
          })
    
    
          // Get all sprice
    
          .addCase(getSprices.pending, (state)=>{
            state.isLoading = true
          })
          .addCase(getSprices.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.sprices = action.payload
    
          })
          .addCase(getSprices.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            toast.error(action.payload)
    
          })
          // Get all sprice
    
          .addCase(updateSprice.pending, (state)=>{
            state.isLoading = true
          })
          .addCase(updateSprice.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.sprices = action.payload
    
          })
          .addCase(updateSprice.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            toast.error(action.payload)
    
          })
      }

})



export const {CALC_SPRICE_VALUE} = spriceSlice.actions
export const selectIsLoading = (state) => state.sprice.isLoading

export default spriceSlice.reducer