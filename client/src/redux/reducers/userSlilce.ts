import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserState } from "../types";

const initialState: UserState = {
  isAuthenticated: false,
  userId: null,
  jsonWebToken: null,
  userType: null,
  userData: null,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    userLoggedIn: (state, action: PayloadAction<UserState>) => {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.userType = action.payload.userType;
      state.userData = action.payload.userData;
      state.jsonWebToken = action.payload.jsonWebToken;
    },
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
    userLoggedOut: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.userType = null;
      state.userData = null;
      state.jsonWebToken = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut, updateUserData } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
