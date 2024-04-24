import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authRepository from "../../Repositories/Auth/AuthRepository";
import RepositoryService from "../../Services/RepositoryService";

const initialState = {
  email: null,
  password: null,
  loading: false,
  error: undefined,
  token: null,
  registration: false,
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
  const repositoryService = new RepositoryService();
  const response = await repositoryService.authRepository.login(data);
  if (response) {
    await AsyncStorage.setItem("token", response.token);
    await AsyncStorage.setItem("email", response.email);
  }
  return response;
});

export const register = createAsyncThunk("auth/register", async (data) => {
  // console.log("Authslice reg ", data);
  const repositoryService = new RepositoryService();
  const response = await repositoryService.authRepository.register(data);

  if (response) {
    await AsyncStorage.setItem("token", response.token);
    await AsyncStorage.setItem("email", response.email);
  }
  // console.log(response);
  return response;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.email = null;
    },
  },
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
      state.token = action.payload.token;
      state.email = action.payload.userEmail;
    });
    builder.addCase(loginSilently.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    //login
    builder.addCase(login.pending, (state) => {
      state.login = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.email = action.payload.email;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    //Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.registration = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
