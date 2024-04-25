import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import purchaseService from './purchaseService';
import { toast } from 'react-toastify';

const initialState = {
    purchase: null,
    purchases: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

//Create Purchase

export const createPurchase = createAsyncThunk(
    "purchses/create",
    async(formData, thunkApi) =>{
        try {
            return await purchaseService.createPurchase(formData)
        } catch(error){
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkApi.rejectWithValue(message)
        }
    }
)


    // Get All purchase
export const getPurchases = createAsyncThunk(
    "purchases/getAll",
    async(_, thunkAPI) => {
        try {
            return await purchaseService.getPurchases()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)


const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    CALC_PURCHASE_VALUE(state, action){
        console.log('Purchase value')
    }
  }, 
  extraReducers: (builder) => {
    builder
        .addCase(createPurchase.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createPurchase.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.purchases.push(action.payload);
            toast.success("Purchase added successfully!")
        })
        .addCase(createPurchase.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload)
        })


        // get all purchase

        .addCase(getPurchases.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getPurchases.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload)
            state.purchases = action.payload;
        })
        .addCase(getPurchases.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload)
        })
  }
});

export const {CALC_PURCHASE_VALUE} = purchaseSlice.actions
export const selectIsLoading = (state) => state.purchase.isLoading

export default purchaseSlice.reducer