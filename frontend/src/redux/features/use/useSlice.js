import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import useSercive from './useService'

const initialState = {
    use: null,
    uses: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}


// Create new use
export const createUse = createAsyncThunk(
    "use/create",
    async (formData, thunkAPI) => {
        try {
            return await useSercive.createUse(formData)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get All use
export const getUse = createAsyncThunk(
    "getAll/create",
    async (_, thunkAPI) => {
        try {
            return await useSercive.getUse()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
                console.log(message)
                return thunkAPI.rejectWithValue(message)
        }
    }
)


const useSlice = createSlice({
  name: "use",
  initialState,
  reducers: {
    CALC_USE(state, action) {
        console.log("Use value")
    }
  },
  extraReducers: (builder) =>{
    builder
        .addCase(createUse.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createUse.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload)
            state.uses.push(action.payload);
            
            toast.success("Product used successfully!")
    
          })
          .addCase(createUse.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            toast.error(action.payload)
    
          })

          .addCase(getUse.pending, (state)=>{
            state.isLoading = true
          })
          .addCase(getUse.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload)
            state.uses = action.payload
    
          })
          .addCase(getUse.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
            toast.error(action.payload)
    
          })
  }
});

export const {CALC_USE} = useSlice.actions
export const selectIsLoading = (state) => state.use.isLoading  // can access isLoading any wheare 


export default useSlice.reducer