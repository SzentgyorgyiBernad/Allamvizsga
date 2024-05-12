import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RepositoryService from "../../Services/RepositoryService";

const initialState = {
  selectedCurrency: null,
  accountName: null,
  amount: null,
  currencies: [],
  loading: false,
  error: undefined,
};

export const getAllCurrencyFromDB = createAsyncThunk(
  "currency/allCurrency",
  async (_, { rejectWithValue }) => {
    console.log("get all currency from db");
    const repositoryService = new RepositoryService();
    const response =
      await repositoryService.invoiceCreateRepository.getAllCurrency();
    console.log("response from fetch", response);
    if (response.error) {
      return rejectWithValue({ error: response.error });
    } else {
      console.log("redx", response);
      return response;
    }
  }
);

export const invoiceCreateSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setAccountName: (state, action) => {
      state.accountName = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCurrencyFromDB.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCurrencyFromDB.fulfilled, (state, action) => {
      state.loading = false;
      console.log("builder", action.payload);
      state.currencies = action.payload;
    });
    builder.addCase(getAllCurrencyFromDB.rejected, (state) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

export default invoiceCreateSlice.reducer;
export const invoiceSelector = (state) => state.invoiceReducer;
export const { setAccountName, setAmount, setSelectedCurrency } =
  invoiceCreateSlice.actions;
