import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  author: { isAuthenticate: false },
};

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    addauthor: (state, action) => {
      state.author = { ...action.payload, isAuthenticated: true };
    },
    removeAuthor: (state, action) => {
      state.author = null;
    },
  },
});

export const { addauthor, removeAuthor } = authorSlice.actions;
export default authorSlice.reducer;
