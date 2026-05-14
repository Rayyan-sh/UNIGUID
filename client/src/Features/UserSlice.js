import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,

  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      const response = await axios.post("http://localhost:3001/registerUser", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        gender: userData.gender,
      });

      console.log(response);

      const user = response.data.user;
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post("http://localhost:3001/login", {
      email: userData.email,
      password: userData.password,
    });

    const user = response.data.user;
    console.log(response);

    return user;
  } catch (error) {
    const errorMessage = "Invalid credentials";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
});

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/updateUserProfile/${userData.email}`,
        {
          email: userData.email,
          name: userData.name,
          password: userData.password,
          profilePic: userData.profilePic,
          gender: userData.gender,
        }
      );

      const user = response.data.user;
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;

      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {

    //  REGISTER 
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

      localStorage.setItem("user", JSON.stringify(action.payload));
    });

    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    //  LOGIN 
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

      localStorage.setItem("user", JSON.stringify(action.payload));
    });

  

    // UPDATE 
    builder.addCase(updateUserProfile.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

      localStorage.setItem("user", JSON.stringify(action.payload));
    });

    builder.addCase(updateUserProfile.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;