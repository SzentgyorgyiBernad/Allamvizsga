import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authRepository from "../../Repositories/Auth/AuthRepository";

const initialState = {
  user: null,
  loading: false,
  error: undefined,
};

export const loginSilently = createAsyncThunk(
  "auth/loginSilently",
  async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      return {
        token: token,
        userEmail: (await AsyncStorage.getItem("email")) || "",
      };
    }

    return null;
  }
);

export const login = createAsyncThunk("auth/login", async (data) => {
  const response = await authRepository.login(data);

  if (response) {
    await AsyncStorage.setItem("token", response.token);
    await AsyncStorage.setItem("email", response.email);
  }
  return response;
});

export const register = createAsyncThunk("auth/register", async (data) => {
  const response = await authRepository.register(data);

  if (response) {
    return true;
  }

  return false;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    //loginSilently
    builder.addCase(loginSilently.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginSilently.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload === null) {
        return;
      }
      state.user = {
        token: action.payload.token,
        userEmail: action.payload.userEmail,
      };
    });
    builder.addCase(loginSilently.rejected, (state) => {
      state.loading = false;
    });
    //login
    builder.addCase(login.pending, (state) => {
      state.login = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = {
        token: action.payload.token,
        userEmail: action.payload.userEmail,
      };
    });
    builder.addCase(login.rejected, (state) => {
      state.login = false;
      state.error = action.error.message;
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, _) => {
      state.loading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
