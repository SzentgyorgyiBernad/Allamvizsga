import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RepositoryService from "../../Services/RepositoryService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  transactionTypes: [],
  loading: false,
  error: undefined,
  transactionsByMonths: [],
  transactions: [],
};

export const getAllTransactionTypes = createAsyncThunk(
  "transaction/allTransactionTypes",
  async () => {
    // console.log("get all transaction types from db");
    const repositoryService = new RepositoryService();
    const response =
      await repositoryService.transactionRepository.getAllTransaction();
    // console.log("response from fetch", response);
    return response;
  }
);

export const getIncomeByMonths = createAsyncThunk(
  "transaction/getIncomeByMOnths",
  async (data) => {
    const repositoryService = new RepositoryService();
    const response =
      await repositoryService.transactionRepository.getIncomeByMonths(data);
    return response;
  }
);

export const getLastThreeTransaction = createAsyncThunk(
  "transaction/getLastThreeTransactions",
  async (data) => {
    const repositoryService = new RepositoryService();
    const response =
      await repositoryService.transactionRepository.getLastThreeTransactions(
        data
      );
    return response;
  }
);

export const createNewTransaction = createAsyncThunk(
  "transaction/createNewTransaction",
  async (transaction) => {
    // console.log("create new transaction in db", transaction);
    // console.log("Account", )
    const token = await AsyncStorage.getItem("token");
    // console.log("token", token);
    const repositoryService = new RepositoryService();
    const response =
      await repositoryService.transactionRepository.createTransaction(
        transaction,
        token
      );
    // console.log("response from fetch", response);
    return response;
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTransactionTypes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTransactionTypes.fulfilled, (state, action) => {
      state.loading = false;
      // console.log("builder", action.payload);
      state.transactionTypes = action.payload.values;
    });
    builder.addCase(getAllTransactionTypes.rejected, (state) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(createNewTransaction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewTransaction.fulfilled, (state, action) => {
      state.loading = false;
      // console.log("builder", action.payload);
    });
    builder.addCase(createNewTransaction.rejected, (state) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(getIncomeByMonths.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getIncomeByMonths.fulfilled, (state, action) => {
      state.loading = false;
      // console.log("builder by month", action.payload.values);
      state.transactionsByMonths = action.payload.values;
    });
    builder.addCase(getIncomeByMonths.rejected, (state) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(getLastThreeTransaction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLastThreeTransaction.fulfilled, (state, action) => {
      state.loading = false;
      console.log("builder", action.payload.values);
      state.transactions = action.payload.values;
    });
    builder.addCase(getLastThreeTransaction.rejected, (state) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

export default transactionSlice.reducer;
