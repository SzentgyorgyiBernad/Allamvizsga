import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    const repositoryService = new RepositoryService();
    const response = await repositoryService.authRepository.login(data);
    // console.log("rep", response);
    if (response.error) {
      // console.log(response.error);
      myError = rejectWithValue({ error: response.error });
      return myError;
    } else {
      await AsyncStorage.setItem("token", response.token);
      await AsyncStorage.setItem("email", response.email);
      console.log("response", response);
      return response;
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    // console.log("data", data);
    const repositoryService = new RepositoryService();
    const response = await repositoryService.authRepository.register(data);
    if (response.error) {
      // console.log(response.error);
      return rejectWithValue({ error: response.error });
    } else {
      await AsyncStorage.setItem("token", response.token);
      await AsyncStorage.setItem("email", response.email);
      return response;
    }
  }
);

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
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
    //Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      // console.log("Fullfilled");
      state.loading = false;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.error = "";
      state.registration = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      // console.log(action.error.error);
      state.error = action.payload.error;
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
