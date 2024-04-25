import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import MainStoreService from "./mainStoreService";

const initialState = {
  mainstore: null,
  mainstores: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New storecat

export const createMainStore = createAsyncThunk(
  "storecat/create",
  async (formData, thunkAPI) => {
    try {
      return await MainStoreService.createMainStore(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMainStore = createAsyncThunk(
  "mainstore/getAll",
  async (_, thunkAPI) => {
    try {
      return await MainStoreService.getMainStore();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const mainStoreSlice = createSlice({
  name: "mainStore",
  initialState,
  reducers: {
    CALC_STORECAT_VALUE(state, action) {
      console.log("StoreList value");
    },
  },
  extraReducers: (builder) => {
    builder

    // Create New storecat

    .addCase(createMainStore.pending, (state)=>{
        state.isLoading = true
      })
      .addCase(createMainStore.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // console.log(action.payload)
        state.mainstores.push(action.payload);
        toast.success("Main store created successfully!")

      })
      .addCase(createMainStore.rejected, (state, action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error(action.payload)

      })

  // Get all storelist

  .addCase(getMainStore.pending, (state)=>{
    state.isLoading = true
  })
  .addCase(getMainStore.fulfilled, (state, action)=>{
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.mainstores = action.payload

  })
  .addCase(getMainStore.rejected, (state, action)=>{
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload
    toast.error(action.payload)

  })
  }
});

export const {CALC_STORECAT_VALUE} = mainStoreSlice.actions;
export const selectIsLoading = (state) => state.mainstore.isLoading  // can access isLoading any wheare 


export default mainStoreSlice.reducer;
