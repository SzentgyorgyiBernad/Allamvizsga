import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RepositoryService from "../../Services/RepositoryService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  transactionTypes: [],
  loading: false,
  error: undefined,
  transactionsByMonths: [],
  transactions: [],
  allTransaction: [],
  incomeType: [],
  outcomeType: [],
  incomeNumber: 0,
  expenditureNumber: 0,
  incomeAmount: 0,
  expenditureAmount: 0,
};

export const getAllTransactionTypes = createAsyncThunk(
  "transaction/allTransactionTypes",
  async () => {
    const token = await AsyncStorage.getItem("token");
    const repositoryService = new RepositoryService();
    const response =
      await repositoryService.transactionRepository.getAllTransaction(token);
    return response;
  }
);

export const getIncomeByMonths = createAsyncThunk(
  "transaction/getIncomeByMonths",
  async (data) => {
    const token = await AsyncStorage.getItem("token");
    const repositoryService = new RepositoryService();
    const response =
      await repositoryService.transactionRepository.getIncomeByMonths(
        data,
        token
      );
    return response;
  }
);

export const getLastThreeTransaction = createAsyncThunk(
  "transaction/getLastThreeTransactions",
  async (data) => {
    const token = await AsyncStorage.getItem("token");
    const repositoryService = new RepositoryService();
    const response =
      await repositoryService.transactionRepository.getLastThreeTransactions(
        data,
        token
      );
    return response;
  }
);

export const createNewTransaction = createAsyncThunk(
  "transaction/createNewTransaction",
  async (data) => {
    const token = await AsyncStorage.getItem("token");
    const repositoryService = new RepositoryService();
    const response =
      await repositoryService.transactionRepository.createTransaction(
        data,
        token
      );
    return response;
  }
);

export const getAllTransactionWithDate = createAsyncThunk(
  "transaction/getAllTransactionWithDate",
  async (data) => {
    const token = await AsyncStorage.getItem("token");
    const repositoryService = new RepositoryService();
    const response =
      await repositoryService.transactionRepository.getAllMyTransactionWithDate(
        data,
        token
      );
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
      if (state.transactions.values.length > 3) {
        state.transactions.values.pop();
      }
      state.transactions.values.unshift(action.payload.values.value);
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
      state.transactions = action.payload.values;
    });
    builder.addCase(getLastThreeTransaction.rejected, (state) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(getAllTransactionWithDate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTransactionWithDate.fulfilled, (state, action) => {
      state.loading = false;
      state.allTransaction = action.payload.values.transactionValues;
      state.incomeType = action.payload.values.incomeTypeValues;
      state.outcomeType = action.payload.values.outcomeTypeValues;
      state.incomeNumber = action.payload.values.income;
      state.expenditureNumber = action.payload.values.outcome;
      state.incomeAmount = action.payload.values.incomeAmount;
      state.expenditureAmount = action.payload.values.outcomeAmount;
    });
    builder.addCase(getAllTransactionWithDate.rejected, (state) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

export default transactionSlice.reducer;
