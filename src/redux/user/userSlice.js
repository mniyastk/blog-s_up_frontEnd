import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { isAuthenticate: false },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = { ...action.payload, isAuthenticated: true };
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
