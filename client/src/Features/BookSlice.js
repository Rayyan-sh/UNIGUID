import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  selectedBook: null,

  booksStatus: "idle",
  bookStatus: "idle",
  error: null,
};
export const getBooksByCourse = createAsyncThunk(
  "books/getBooksByCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/books/course/${courseId}`
      );
      return res.data.books;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getBookById = createAsyncThunk(
  "books/getBookById",
  async (bookId) => {
    const res = await axios.get(
      `http://localhost:3001/books/${bookId}`
    );

    return res.data.book || res.data;
  }
);
const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
.addCase(getBooksByCourse.pending, (state) => {
  state.booksStatus = "loading";
})
.addCase(getBooksByCourse.fulfilled, (state, action) => {
  state.booksStatus = "succeeded";
  state.books = action.payload || [];
})
.addCase(getBooksByCourse.rejected, (state, action) => {
  state.booksStatus = "failed";
  state.error = action.payload;
})

    .addCase(getBookById.pending, (state) => {
  state.bookStatus = "loading";
})
.addCase(getBookById.fulfilled, (state, action) => {
  state.bookStatus = "succeeded";
  state.selectedBook = action.payload;
})
.addCase(getBookById.rejected, (state, action) => {
  state.bookStatus = "failed";
  state.error = action.payload;
});
  },
});

export const { clearSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;