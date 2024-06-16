import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RepositoryService from "../../Services/RepositoryService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  loading: false,
  error: undefined,
  expenditures: [],
  totalAmount: 0,
  budget: null,
  plannedExpenditures: [],
  compareToLastMonthPercentage: 0,
};

export const getExpendituresFromCurrentMonth = createAsyncThunk(
  "expenditure/getExpendituresFromSpecDate",
  async (data) => {
    // console.log("getExpendituresFromCurrentMonth", data);
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
    // console.log("getPlannedExpenditures", response);
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

export const expenditureSlice = createSlice({
  name: "expenditure",
  initialState,
  reducers: {
    addNewToState: (state, action) => {
      state.expenditures = action.payload;
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
        // console.log(
        //   "getExpendituresFromCurrentMonth.fulfilled",
        //   action.payload.values.transactions
        // );
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
      state.plannedExpenditures = action.payload;
      console.log("getPlannedExpenditures.fulfilled", action.payload);
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
      //   console.log("compareToLastMonth.fulfilled", action.payload);
      state.loading = false;
    });
    builder.addCase(compareToLastMonth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default expenditureSlice.reducer;
