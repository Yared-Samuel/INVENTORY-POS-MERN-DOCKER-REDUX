import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import deliverListService from './deliverService';
import { toast } from 'react-toastify';


const initialState = {
    deliver: null,
    delivers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

// Creat new deliver

export const createDeliver = createAsyncThunk(
    "deliver/create",
    async (formData, thunkAPI) => {
        try {
            return await deliverListService.createDeliver(formData)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)

// Create All delivers

export const getDelivers = createAsyncThunk(
    "delivers/getAll",
    async (_, thunkAPI) => {
        try {
            return await deliverListService.getDelivers()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)


// deliver slice

const deliverListSlice = createSlice({
  name: "deliver",
  initialState,
  reducers: {
    CALC_RETURN_VALUE(state, action) {
        console.log("RETURN value")
    }
  },

  extraReducers: (builder) =>{
    builder

    // Create delivery
        .addCase(createDeliver.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createDeliver.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.delivers.push(action.payload)
            toast.success("Product added to store!")
        })
        .addCase(createDeliver.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            toast.error(action.payload)
        })

    // Get all delivery

        .addCase(getDelivers.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getDelivers.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.delivers = action.payload
        })
        .addCase(getDelivers.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            toast.error(action.payload)
        })
  }
});

export const {CALC_RETURN_VALUE} = deliverListSlice.actions
export const selectIsLoading = (state) => state.deliver.isLoading  // can access isLoading any wheare 


export default deliverListSlice.reducer