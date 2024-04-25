import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import storelistService from './storelistService';
import { toast } from 'react-toastify';

const initialState = {
    storelist: null,
    storelists: [],
    finishedStore: [],
    rawStore: [],
    fixedStore: [],
    useStore: [],
    othersStore: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

// Create storelist

export const createStorelist = createAsyncThunk(
    "storelist/create",

    // Create Storelist
    async (formData, thunkAPI) => {
        try {
            return await storelistService.createStorelist(formData)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get all storeLists

export const getStorelists = createAsyncThunk(
    "storelists/getAll",
    async (_, thunkAPI) => {
        try {
            return await storelistService.getStorelists()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get all storeLists by Type


export const getStoreFinished = createAsyncThunk(
    "StoreFinished/getAll",
    async (_, thunkAPI) => {
        try {
            return await storelistService.getStoreFinished()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)


export const getStoreRaw = createAsyncThunk(
    "getStoreRaw/getAll",
    async (_, thunkAPI) => {
        try {
            return await storelistService.getStoreRaw()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)
export const getStoreFixed = createAsyncThunk(
    "getStoreFixed/getAll",
    async (_, thunkAPI) => {
        try {
            return await storelistService.getStoreFixed()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)
export const getStoreUse = createAsyncThunk(
    "getStoreUse/getAll",
    async (_, thunkAPI) => {
        try {
            return await storelistService.getStoreUse()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)
export const getStoreOthers = createAsyncThunk(
    "getStoreOthers/getAll",
    async (_, thunkAPI) => {
        try {
            return await storelistService.getStoreOthers()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)



const storelistSlice = createSlice({
  name: "storelist",
  initialState,
  reducers: {
    CALC_STORELIST_VALUE(state, action) {
        console.log("StoreList value")
    }
  },
  extraReducers: (builder)=>{
    builder
      .addCase(createStorelist.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(createStorelist.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.storelists.push(action.payload);
        toast.success("Store created successfully!")

      })
      .addCase(createStorelist.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error(action.payload)

      })


      // Get all storelist

      .addCase(getStorelists.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(getStorelists.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.storelists = action.payload

      })
      .addCase(getStorelists.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error(action.payload)

      })
      // Get all storelist by type

      .addCase(getStoreFinished.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(getStoreFinished.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.finishedStore = action.payload

      })
      .addCase(getStoreFinished.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error(action.payload)

      })



      .addCase(getStoreRaw.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(getStoreRaw.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.rawStore = action.payload

      })
      .addCase(getStoreRaw.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error(action.payload)

      })



      


      .addCase(getStoreFixed.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(getStoreFixed.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.fixedStore = action.payload

      })
      .addCase(getStoreFixed.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error(action.payload)

      })



      .addCase(getStoreUse.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(getStoreUse.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload)
        state.useStore = action.payload

      })
      .addCase(getStoreUse.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error(action.payload)

      })

      .addCase(getStoreOthers.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(getStoreOthers.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload)
        state.othersStore = action.payload

      })
      .addCase(getStoreOthers.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error(action.payload)

      })




  }


});

export const {CALC_STORELIST_VALUE} = storelistSlice.actions
export const selectIsLoading = (state) => state.storelist.isLoading  // can access isLoading any wheare 

export default storelistSlice.reducer