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
    const repositoryService = new RepositoryService();
    const token = await AsyncStorage.getItem("token");
    const response =
      await repositoryService.accountCreateRepository.getAllCurrency(token);
    return response;
  }
);

export const createDefaultAccount = createAsyncThunk(
  "account/createDefaultAccount",
  async (data, { rejectWithValue }) => {
    const token = await AsyncStorage.getItem("token");
    const repositoryService = new RepositoryService();
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
      state.currencies = action.payload.values;
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
