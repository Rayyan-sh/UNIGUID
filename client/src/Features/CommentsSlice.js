import * as ENV from "../config"; //Environment Variables
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comments: [],
  status: "idle",
};
export const getCommentsByBook = createAsyncThunk(
  "comments/getByBook",
  async (bookId) => {
    //const res = await axios.get(`http://localhost:3001/comments/book/${bookId}`);
    const res = await axios.get(`${ENV.SERVER_URL}/comments/book/${bookId}`);
    return res.data.comments;
  }
);
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ bookId, userId, commentBody }) => {
    //const res = await axios.post("http://localhost:3001/comments",{ bookId, userId, commentBody });
    const res = await axios.post(`${ENV.SERVER_URL}/comments`, {
  bookId,
  userId,
  commentBody
});
    return res.data.comment;
  }
);

export const toggleReaction = createAsyncThunk(
  "comments/toggleReaction",
  async ({ commentId, userId, type }) => {
   // const res = await axios.put(`http://localhost:3001/comments/react/${commentId}`,{ userId, type });
   const res = await axios.put(
  `${ENV.SERVER_URL}/comments/react/${commentId}`,
  { userId, type }
);
    return res.data.comment;
  }
);
const CommentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getCommentsByBook.fulfilled, (state, action) => {
      state.comments = action.payload;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.unshift(action.payload);
    });

    // LIKE DISLIKE UPDATE
    builder.addCase(toggleReaction.fulfilled, (state, action) => {
      const updated = action.payload;

      const index = state.comments.findIndex(
        (c) => c._id === updated._id
      );

      if (index !== -1) {
        state.comments[index] = updated;
      }
    });
  },
});

export default CommentsSlice.reducer;