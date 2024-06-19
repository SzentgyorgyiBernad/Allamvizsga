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
    const token = await AsyncStorage.getItem("token");
    const repositoryService = new RepositoryService();
    const response = await repositoryService.accountRepository.getAllAccount(
      token
    );
    return response;
  }
);

export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async (data) => {
    const token = await AsyncStorage.getItem("token");
    const repositoryService = new RepositoryService();
    const response = await repositoryService.accountRepository.deleteMyAccount(
      data,
      token
    );
    return response;
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setSelectedAccount: (state, action) => {
      state.selectedAccount = action.payload;
    },
    addAmountToSelectedAccount: (state, action) => {
      const account = state.accounts.find(
        (account) => account.id === state.selectedAccount.id
      );

      if (account) {
        account.amount =
          parseFloat(account.amount) + parseFloat(action.payload.amount);
        state.selectedAccount.amount = account.amount;
      }
    },
    addToAccounts: (state, action) => {
      state.accounts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAccounts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAccounts.fulfilled, (state, action) => {
      state.loading = false;
      state.accounts = action.payload.values;
    });
    builder.addCase(getAllAccounts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.accounts = state.accounts.filter(
        (account) => account.id !== action.payload.message.id
      );
    });
    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default accountSlice.reducer;
export const { setSelectedAccount, addToAccounts, addAmountToSelectedAccount } =
  accountSlice.actions;
