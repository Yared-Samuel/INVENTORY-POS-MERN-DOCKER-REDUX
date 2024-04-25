import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import reportService from './reportService';
import { toast } from 'react-toastify';


const initialState = {
    dailySale: null,
    dailySales: [],

    dailyServe: null,
    dailyServes: [],

    dailyPurchase: null,
    dailyPurchases: [],

    dailyStoreSale: null,
    dailyStoreSales: [],

    storeBalance: null,
    storeBalances: [],

    invBalance: null,
    invBalances: [],

    cashBalance: null,
    cashBalances: [],

    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const getDailySale = createAsyncThunk(
    "getDailySale/getAll",
    async(_, thunkAPI) => {
        try {
            return await reportService.getDailySale()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getDailyServe = createAsyncThunk(
    "getDailyServe/getAll",
    async(_, thunkAPI) => {
        try {
            return await reportService.getDailyServe()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getDailyPurchase = createAsyncThunk(
    "getDailyPurchase/getAll",
    async(_, thunkAPI) => {
        try {
            return await reportService.getDailyPurchase()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getStoreDailySale = createAsyncThunk(
    "getStoreDailySale/getAll",
    async(_, thunkAPI) => {
        try {
            return await reportService.getStoreDailySale()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getStoreBalance = createAsyncThunk(
    "getStoreBalance/getAll",
    async(_, thunkAPI) => {
        try {
            return await reportService.getStoreBalance()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getInvBalance = createAsyncThunk(
    "getInvBalance/getAll",
    async(_, thunkAPI) => {
        try {
            return await reportService.getInvBalance()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getCashBalances = createAsyncThunk(
    "getCashBalances/getAll",
    async(_, thunkAPI) => {
        try {
            return await reportService.getCashBalances()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    CALC_SALE_DAILY(state, action){
        console.log("daily sale value")
    }
  },
  extraReducers: (builder) => {
    builder
        // get all dailySale

        .addCase(getDailySale.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getDailySale.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.dailySales = action.payload;
        })
        .addCase(getDailySale.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            
            state.message = action.payload;
            toast.error(action.payload)
        })
        // get all daily Serve

        .addCase(getDailyServe.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getDailyServe.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.dailyServes = action.payload;
        })
        .addCase(getDailyServe.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload)
        })
        // get daily purchase
        .addCase(getDailyPurchase.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getDailyPurchase.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.dailyPurchases = action.payload;
        })
        .addCase(getDailyPurchase.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload)
        })
        // get all Store sale daily

        .addCase(getStoreDailySale.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getStoreDailySale.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.dailyStoreSales = action.payload;
        })
        .addCase(getStoreDailySale.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload)
        })
        // get all Store sale daily

        .addCase(getStoreBalance.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getStoreBalance.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.storeBalances = action.payload;
        })
        .addCase(getStoreBalance.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload)
        })

        // get all Store sale daily

        .addCase(getInvBalance.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getInvBalance.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.invBalances = action.payload;
        })
        .addCase(getInvBalance.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload)
        })
        .addCase(getCashBalances.pending, (state)=>{
            state.isLoading = true
        })

        .addCase(getCashBalances.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.cashBalances = action.payload;
        })
        .addCase(getCashBalances.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload)
        })

  }
});

export const {CALC_SALE_DAILY} = reportSlice.actions
export const selectIsLoading = (state)=>state.report.isLoading

export default reportSlice.reducer