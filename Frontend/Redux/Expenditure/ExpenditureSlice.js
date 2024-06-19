import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RepositoryService from "../../Services/RepositoryService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  loading: false,
  error: undefined,
  expenditures: [],
  totalAmount: 0,
  budget: [],
  plannedExpenditures: [],
  compareToLastMonthPercentage: 0,
};

export const getExpendituresFromCurrentMonth = createAsyncThunk(
  "expenditure/getExpendituresFromSpecDate",
  async (data) => {
    const repositoryService = new RepositoryService();
    const token = await AsyncStorage.getItem("token");
    const response =
      await repositoryService.expenditureRepository.getMyExpendituresFromCurrentMonth(
        data,
        token
      );
    return response;
  }
);

export const getPlannedExpenditures = createAsyncThunk(
  "expenditure/getPlannedExpenditures",
  async (data) => {
    const repositoryService = new RepositoryService();
    const token = await AsyncStorage.getItem("token");
    const response =
      await repositoryService.expenditureRepository.getMyPlannedExpenditures(
        data,
        token
      );
    return response;
  }
);

export const compareToLastMonth = createAsyncThunk(
  "expenditure/compareToLastMonth",
  async (data) => {
    const repositoryService = new RepositoryService();
    const token = await AsyncStorage.getItem("token");
    const response =
      await repositoryService.expenditureRepository.compareToMyLastMonth(
        data,
        token
      );
    return response;
  }
);

export const createBudget = createAsyncThunk(
  "expenditure/createBudget",
  async (data) => {
    const repositoryService = new RepositoryService();
    const token = await AsyncStorage.getItem("token");
    const response =
      await repositoryService.expenditureRepository.createMyBudget(data, token);
    return response;
  }
);

export const getMyBudget = createAsyncThunk(
  "expenditure/getMyBudget",
  async (data) => {
    const repositoryService = new RepositoryService();
    const token = await AsyncStorage.getItem("token");
    const response = await repositoryService.expenditureRepository.getBudget(
      data,
      token
    );

    return response;
  }
);

export const expenditureSlice = createSlice({
  name: "expenditure",
  initialState,
  reducers: {
    addNewToState: (state, action) => {
      state.expenditures = action.payload;
    },
    addExpenditure: (state, action) => {
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
        state.expenditures = [newTransaction, ...state.expenditures];
        state.totalAmount =
          parseFloat(state.totalAmount) + parseFloat(newTransaction.amount);
      }
      if (transactionDate >= currentDate && transactionDate <= lastDayOfMonth) {
        const newTransactionDaysRemaining = Math.ceil(
          (new Date(newTransaction.date) - now) / (1000 * 60 * 60 * 24)
        );

        newTransaction.daysRemaining = newTransactionDaysRemaining;
        state.plannedExpenditures = [
          newTransaction,
          ...state.plannedExpenditures,
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getExpendituresFromCurrentMonth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getExpendituresFromCurrentMonth.fulfilled,
      (state, action) => {
        state.expenditures = action.payload.values.transactions;
        state.totalAmount = action.payload.values.totalExpenditure;
        state.loading = false;
      }
    );
    builder.addCase(
      getExpendituresFromCurrentMonth.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }
    );
    builder.addCase(getPlannedExpenditures.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPlannedExpenditures.fulfilled, (state, action) => {
      state.plannedExpenditures = action.payload.values.values;
      state.loading = false;
    });
    builder.addCase(getPlannedExpenditures.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(compareToLastMonth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(compareToLastMonth.fulfilled, (state, action) => {
      state.compareToLastMonthPercentage = action.payload;
      state.loading = false;
    });
    builder.addCase(compareToLastMonth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createBudget.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBudget.fulfilled, (state, action) => {
      state.budget = action.payload.values.values;
      state.loading = false;
    });
    builder.addCase(createBudget.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getMyBudget.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMyBudget.fulfilled, (state, action) => {
      state.budget = action.payload.values.values;
      state.loading = false;
    });
    builder.addCase(getMyBudget.rejected, (state, action) => {
      state.loading = false;

      state.error = action.error.message;
    });
  },
});

export default expenditureSlice.reducer;
export const { addNewToState, addExpenditure } = expenditureSlice.actions;
