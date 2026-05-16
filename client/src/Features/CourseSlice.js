import * as ENV from "../config"; //Environment Variables
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  courses: [],
  status: "idle",
  error: null,
};

export const getCourses = createAsyncThunk(
  "courses/getCourses",
  async () => {
    try {
      //const res = await axios.get("http://localhost:3001/courses");
      const res = await axios.get(`${ENV.SERVER_URL}/courses`);
      return res.data; 
    } catch (error) {
      throw error;
    }
  }
);
const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.status = "loading";
      })
.addCase(getCourses.fulfilled, (state, action) => {
  state.status = "succeeded";
  state.courses = action.payload.courses;
})
      .addCase(getCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default courseSlice.reducer;