import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RepositoryService from "../../Services/RepositoryService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  accounts: [],
  loading: false,
  error: undefined,
  selectedAccount: null,
};

export const getAllAccounts = createAsyncThunk(
  "account/allAccounts",

  async () => {
    // console.log("getAllAccounts in redux");
    const token = await AsyncStorage.getItem("token");
    const repositoryService = new RepositoryService();
    // console.log("token", token);
    const response = await repositoryService.accountRepository.getAllAccount(
      token
    );
    // console.log("response", response);
    return response;
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setSelectedAccount: (state, action) => {
      // console.log("action.payload", action.payload);
      state.selectedAccount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAccounts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAccounts.fulfilled, (state, action) => {
      state.loading = false;
      // console.log("action.payload", action.payload);
      state.accounts = action.payload.values;
      // console.log("state.accounts", JSON.stringify(state.accounts));
    });
    builder.addCase(getAllAccounts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default accountSlice.reducer;
export const { setSelectedAccount } = accountSlice.actions;
