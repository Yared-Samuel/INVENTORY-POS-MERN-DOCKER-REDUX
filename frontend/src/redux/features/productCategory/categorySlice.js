import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import categoryService from './categoryService';
import { toast } from 'react-toastify';

const initialState = {
    category: null,
    categories: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

// Create Category

export const createProdCat = createAsyncThunk(
    "prodCat/create",
    async (formData, thunkAPI)=>{
        try {
            return await categoryService.createProdCat(formData)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                    console.log(message)
                    return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get all product category 

export const getProdCat = createAsyncThunk(
    "prodCat/getAll",
    async (_, thunkAPI)=>{
        try {
            return await categoryService.getProdCat()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                    console.log(message)
                    return thunkAPI.rejectWithValue(message)
        }
    }
)

const prodCategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    CALC_CATEGORY(state, action) {
        console.log("Category")
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(createProdCat.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createProdCat.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload)
            state.categories.push(action.payload);
            toast.success("Product Category added successfully!")
    
          })
          .addCase(createProdCat.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            toast.error(action.payload)
    
          })






          .addCase(getProdCat.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getProdCat.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload)
            state.categories = action.payload
    
          })
          .addCase(getProdCat.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            toast.error(action.payload)
    
          })
  }
});

export const {CALC_CATEGORY} = prodCategorySlice.actions
export const selectIsLoading = (state) =>state.category.isLoading
export default prodCategorySlice.reducer