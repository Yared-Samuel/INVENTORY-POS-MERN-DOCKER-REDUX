import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productService from './productservice';
import { toast } from 'react-toastify';

const initialState = {
    product: null,
    products: [],
    productFinished: [],
    productRaw: [],
    productFixed: [],
    productUse: [],
    productOther: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

// Create New Product
export const createProduct = createAsyncThunk(
    "products/create",
    async (formData, thunkAPI) => {
        try {
            return await productService.createProduct(formData)
        } catch (error) {
          const message = (
            error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString()
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)


// Get All Products
export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
      try {
          return await productService.getProducts()
      } catch (error) {
        const message = (
          error.response && error.response.data && error.response.data.message) ||
          error.message || error.toString()
          console.log(message)
          return thunkAPI.rejectWithValue(message)
      }
  }
)


// Get Products by type
export const getFinishedProducts = createAsyncThunk(
  "productsType/getFinished",
  async (_, thunkAPI) => {
      try {
        return await productService.getFinishedProducts()
      } catch (error) {
        const message = (
          error.response && error.response.data && error.response.data.message) ||
          error.message || error.toString()
          console.log(message)
          return thunkAPI.rejectWithValue(message)
      }
  }
)


export const getRawProducts = createAsyncThunk(
  "productsType/getRaw",
  async (_, thunkAPI) => {
      try {
        return await productService.getRawProducts()
        
      } catch (error) {
        const message = (
          error.response && error.response.data && error.response.data.message) ||
          error.message || error.toString()
          console.log(message)
          return thunkAPI.rejectWithValue(message)
      }
  }
)


export const getFixedProducts = createAsyncThunk(
  "productsType/getFixed",
  async (_, thunkAPI) => {
      try {
          return await productService.getFixedProducts()
      } catch (error) {
        const message = (
          error.response && error.response.data && error.response.data.message) ||
          error.message || error.toString()
          console.log(message)
          return thunkAPI.rejectWithValue(message)
      }
  }
)


export const getUseAndThrowProducts = createAsyncThunk(
  "productsType/getUseAndThrow",
  async (_, thunkAPI) => {
      try {
          return await productService.getUseAndThrowProducts()
      } catch (error) {
        const message = (
          error.response && error.response.data && error.response.data.message) ||
          error.message || error.toString()
          console.log(message)
          return thunkAPI.rejectWithValue(message)
      }
  }
)


export const getOtherProducts = createAsyncThunk(
  "productsType/getOther",
  async (_, thunkAPI) => {
      try {
          return await productService.getOtherProducts()
      } catch (error) {
        const message = (
          error.response && error.response.data && error.response.data.message) ||
          error.message || error.toString()
          console.log(message)
          return thunkAPI.rejectWithValue(message)
      }
  }
)





// product slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
        console.log("Store value")
    }
  },
  
  extraReducers: (builder)=>{
    builder
      .addCase(createProduct.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products.push(action.payload);
        toast.success("Product added successfully!")

      })
      .addCase(createProduct.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error(action.payload)

      })


      // Get all products

      .addCase(getProducts.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload)
        state.products = action.payload

      })
      .addCase(getProducts.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error(action.payload)

      })
      // Get aproduct by type

      .addCase(getFinishedProducts.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(getFinishedProducts.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload)
        state.productFinished = action.payload

      })
      .addCase(getFinishedProducts.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error(action.payload)

      })

      .addCase(getRawProducts.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(getRawProducts.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload)
        state.productRaw = action.payload

      })
      .addCase(getRawProducts.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error(action.payload)

      })

      .addCase(getFixedProducts.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(getFixedProducts.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload)
        state.productFixed = action.payload

      })
      .addCase(getFixedProducts.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error(action.payload)

      })

      .addCase(getUseAndThrowProducts.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(getUseAndThrowProducts.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload)
        state.productUse = action.payload

      })
      .addCase(getUseAndThrowProducts.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error(action.payload)

      })

      .addCase(getOtherProducts.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(getOtherProducts.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload)
        state.productOther = action.payload

      })
      .addCase(getOtherProducts.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error(action.payload)

      })
  }
});

export const {CALC_STORE_VALUE} = productSlice.actions
export const selectIsLoading = (state) => state.product.isLoading  // can access isLoading any wheare 


export default productSlice.reducer