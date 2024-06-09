import {
  buildCreateSlice,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import RepositoryService from "../../Services/RepositoryService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  loading: false,
  error: undefined,
  transactions: [],
  budget: null,
  plannedTransactions: [],
  compareToLastMonth: 0,
};

export const getTransactionsFromSpecDate = createAsyncThunk(
  "transaction/getTransactionsFromSpecDate",
  async (data) => {
    const repositoryService = new RepositoryService();
    const token = await AsyncStorage.getItem("token");
    const response =
      await repositoryService.transactionRepository.getMyTransactionsFromSpecDate(
        data,
        token
      );
    return response;
  }
);

export const getPlannedTransactions = createAsyncThunk(
  "transaction/getPlannedTransactions",
  async (data) => {
    const repositoryService = new RepositoryService();
    const token = await AsyncStorage.getItem("token");
    const response =
      await repositoryService.transactionRepository.getMyPlannedTransactions(
        data,
        token
      );
    return response;
  }
);

export const compareToLastMonth = createAsyncThunk(
  "transaction/compareToLastMonth",
  async (data) => {
    const repositoryService = new RepositoryService();
    const token = await AsyncStorage.getItem("token");
    const response =
      await repositoryService.transactionRepository.compareToMyLastMonth(
        data,
        token
      );
    return response;
  }
);

export const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactionsFromSpecDate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTransactionsFromSpecDate.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload.values;
    });
    builder.addCase(getTransactionsFromSpecDate.rejected, (state) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(getPlannedTransactions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPlannedTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.plannedTransactions = action.payload.values;
    });
    builder.addCase(getPlannedTransactions.rejected, (state) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(compareToLastMonth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(compareToLastMonth.fulfilled, (state, action) => {
      state.loading = false;
      state.compareToLastMonth = action.payload.values;
    });
    builder.addCase(compareToLastMonth.rejected, (state) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

export default incomeSlice.reducer;
