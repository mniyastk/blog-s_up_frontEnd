import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice";
import authorReducer from "../redux/author/authorSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    author: authorReducer,
  },
});
