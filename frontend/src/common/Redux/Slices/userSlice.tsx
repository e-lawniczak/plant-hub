import { createSlice } from "@reduxjs/toolkit";
import { IUserModel } from "../models";

export interface IUserSlice {
  user: IUserModel | null;
}

const initialState = {
  user: null,
} as IUserSlice;

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
