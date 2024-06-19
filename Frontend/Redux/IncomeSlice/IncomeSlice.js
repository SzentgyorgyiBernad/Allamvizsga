import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RepositoryService from "../../Services/RepositoryService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  loading: false,
  error: undefined,
  transactions: [],
  totalAmount: 0,
  budget: null,
  plannedTransactions: [],
  compareToLastMonthPercentage: 0,
  goals: [],
};

export const getTransactionsFromCurrentMonth = createAsyncThunk(
  "income/getTransactionsFromSpecDate",
  async (data) => {
    const repositoryService = new RepositoryService();
    const token = await AsyncStorage.getItem("token");
    const response =
      await repositoryService.incomeRepository.getMyTransactionsFromCurrentMonth(
        data,
        token
      );
    return response;
  }
);

export const getPlannedTransactions = createAsyncThunk(
  "income/getPlannedTransactions",
  async (data) => {
    const repositoryService = new RepositoryService();
    const token = await AsyncStorage.getItem("token");
    const response =
      await repositoryService.incomeRepository.getMyPlannedTransactions(
        data,
        token
      );
    return response;
  }
);

export const compareToLastMonth = createAsyncThunk(
  "income/compareToLastMonth",
  async (data) => {
    const repositoryService = new RepositoryService();
    const token = await AsyncStorage.getItem("token");
    const response =
      await repositoryService.incomeRepository.compareToMyLastMonth(
        data,
        token
      );
    return response;
  }
);

export const createGoal = createAsyncThunk(
  "income/createGoal",
  async (data) => {
    const repositoryService = new RepositoryService();
    const token = await AsyncStorage.getItem("token");
    const response = await repositoryService.incomeRepository.createMyGoal(
      data,
      token
    );
    return response;
  }
);

export const getGoals = createAsyncThunk("income/getGoals", async (data) => {
  const repositoryService = new RepositoryService();
  const token = await AsyncStorage.getItem("token");
  const response = await repositoryService.incomeRepository.getMyGoals(
    data,
    token
  );
  return response;
});

export const addMoneyToGoals = createAsyncThunk(
  "income/addMoneyToGoals",
  async (data) => {
    const repositoryService = new RepositoryService();
    const token = await AsyncStorage.getItem("token");
    const response = await repositoryService.incomeRepository.addMoneyToGoal(
      data,
      token
    );
    return response;
  }
);

export const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    addIncome: (state, action) => {
      const now = new Date();
      const newTransaction = {
        ...action.payload,
        date: new Date(action.payload.newDate).toISOString(),
      };
      const currentDate = new Date();
      const transactionDate = new Date(newTransaction.date);
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );

      if (
        transactionDate <= currentDate &&
        transactionDate >= firstDayOfMonth
      ) {
        state.transactions = [newTransaction, ...state.transactions];
        state.totalAmount =
          parseInt(state.totalAmount) + parseInt(newTransaction.amount);
      }
      if (transactionDate >= currentDate && transactionDate <= lastDayOfMonth) {
        const newTransactionDaysRemaining = Math.ceil(
          (new Date(newTransaction.date) - now) / (1000 * 60 * 60 * 24)
        );
        newTransaction.daysRemaining = newTransactionDaysRemaining;
        state.plannedTransactions = [
          newTransaction,
          ...state.plannedTransactions,
        ];
      }
    },
    addMoneyToGoal: (state, action) => {
      const goal = state.goals.find(
        (goal) => goal.id === action.payload.goalId
      );
      goal.amount = parseInt(goal.amount) + parseInt(action.payload.amount);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTransactionsFromCurrentMonth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getTransactionsFromCurrentMonth.fulfilled,
      (state, action) => {
        state.loading = false;
        state.transactions = action.payload.values.transactions;
        state.totalAmount = action.payload.values.totalIncome;
      }
    );
    builder.addCase(getTransactionsFromCurrentMonth.rejected, (state) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(getPlannedTransactions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPlannedTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.plannedTransactions = action.payload.values.values;
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
      state.compareToLastMonthPercentage = action.payload.values;
    });
    builder.addCase(compareToLastMonth.rejected, (state) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(createGoal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createGoal.fulfilled, (state, action) => {
      state.loading = false;
      state.goals.push(action.payload.values.values);
    });
    builder.addCase(createGoal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(getGoals.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGoals.fulfilled, (state, action) => {
      state.loading = false;
      state.goals = action.payload.values.values;
    });
    builder.addCase(getGoals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    builder.addCase(addMoneyToGoals.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addMoneyToGoals.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addMoneyToGoals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

export default incomeSlice.reducer;
export const { addIncome, addMoneyToGoal } = incomeSlice.actions;
