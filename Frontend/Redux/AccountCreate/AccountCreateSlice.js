import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RepositoryService from "../../Services/RepositoryService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  currencies: [],
  loading: false,
  error: undefined,
  final: false,
};

export const getAllCurrencyFromDB = createAsyncThunk(
  "currency/allCurrency",
  async () => {
    // console.log("get all currency from db");
    const repositoryService = new RepositoryService();
    // console.log("repositoryService");
    const token = await AsyncStorage.getItem("token");
    // console.log("token", token);
    const response =
      await repositoryService.accountCreateRepository.getAllCurrency(token);
    // console.log("response from fetch", response);
    return response;
  }
);

export const createDefaultAccount = createAsyncThunk(
  "account/createDefaultAccount",
  async (data, { rejectWithValue }) => {
    // console.log("createDefaultAccount", data);
    const token = await AsyncStorage.getItem("token");
    const repositoryService = new RepositoryService();
    console.log("repositoryService", data);
    const response =
      await repositoryService.accountCreateRepository.createDefaultAccount(
        data,
        token
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
      state.currencies = action.payload.values;
      // console.log("state.currencies", state.currencies);
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
