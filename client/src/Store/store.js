import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "../Features/UserSlice";
import courseReducer from "../Features/CourseSlice";
import booksReducer from "../Features/BookSlice";
import commentsReducer from "../Features/CommentsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    courses: courseReducer,
    books: booksReducer,
    comments: commentsReducer,
  },
});