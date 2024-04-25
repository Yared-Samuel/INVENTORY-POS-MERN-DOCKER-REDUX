import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import serveService from './serveService'
import { toast } from 'react-toastify'



const initialState = {
    serve: null,
    serves: [],
    isErrorServe: false,
    isSuccessServe: false,
    isLoadingServe: false,
    message: "",
}

// Create new serve

export const createServe = createAsyncThunk(
    "serve/create",
    async (formData, thunkAPI) => {
        try {
            return await serveService.createServe(formData)
        } catch (error) {
          const message = (
            error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString()
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get All servs

export const getServes = createAsyncThunk(
    "serve/getAll",
    async (_, thunkAPI) => {
        try {
            return await serveService.getServes()
        } catch (error) {
          const message = (
            error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString()
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
  )
  

const serveSlice = createSlice({
  name: "serve",
  initialState,
  reducers: {
    CALC_SERVE_VALUE(state, action){
        console.log("serve value")
    }
  },
  extraReducers: (builder)=>{
    builder
    .addCase(createServe.pending, (state)=>{
        state.isLoadingServe = true
      })
      .addCase(createServe.fulfilled, (state, action)=>{
        state.isLoadingServe = false;
        state.isSuccessServe = true;
        state.isErrorServe = false;
        state.serves.push(action.payload);
        toast.success("Service added successfully!")

      })
      .addCase(createServe.rejected, (state, action)=>{
        state.isLoadingServe = false;
        state.isErrorServe = true;
        state.message = action.payload
        toast.error(action.payload)

      })

      // GEt services

    .addCase(getServes.pending, (state)=>{
        state.isLoadingServe = true
      })
      .addCase(getServes.fulfilled, (state, action)=>{
        state.isLoadingServe = false;
        state.isSuccessServe = true;
        state.isErrorServe = false;
        state.serves = action.payload;

      })
      .addCase(getServes.rejected, (state, action)=>{
        state.isLoadingServe = false;
        state.isErrorServe = true;
        state.message = action.payload
        toast.error(action.payload)

      })
  }
});

export const {CALC_SERVE_VALUE} = serveSlice.actions
export const selectIsLoadingServe = (state) => state.serve.isLoadingServe

export default serveSlice.reducer