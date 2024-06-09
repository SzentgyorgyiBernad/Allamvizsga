import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RepositoryService from "../../Services/RepositoryService";

const initialState = {
  currencies: [],
  loading: false,
  error: undefined,
  final: false,
};

export const getAllCurrencyFromDB = createAsyncThunk(
  "currency/allCurrency",
  async (_, { rejectWithValue }) => {
    // console.log("get all currency from db");
    const repositoryService = new RepositoryService();
    const response =
      await repositoryService.accountCreateRepository.getAllCurrency();
    // console.log("response from fetch", response);
    if (response.error) {
      return rejectWithValue({ error: response.error });
    } else {
      // console.log("redx", response);
      return response;
    }
  }
);

export const createDefaultAccount = createAsyncThunk(
  "account/createDefaultAccount",
  async (data, { rejectWithValue }) => {
    // console.log("createDefaultAccount", data);
    const repositoryService = new RepositoryService();
    const response =
      await repositoryService.accountCreateRepository.createDefaultAccount(
        data
      );
    if (response.error) {
      return rejectWithValue({ error: response.error });
    } else {
      return response;
    }
  }
);

export const accountCreateSlice = createSlice({
  name: "accountCreate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCurrencyFromDB.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCurrencyFromDB.fulfilled, (state, action) => {
      state.loading = false;
      // console.log("builder currencies", action.payload);
      state.currencies = action.payload;
    });
    builder.addCase(getAllCurrencyFromDB.rejected, (state) => {
      state.loading = false;
      state.error = action.payload.error;
    });

    builder.addCase(createDefaultAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createDefaultAccount.fulfilled, (state) => {
      state.loading = false;
      state.final = true;
    });
    builder.addCase(createDefaultAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

export default accountCreateSlice.reducer;
// export const accountSelector = (state) => state.accountReducer;
