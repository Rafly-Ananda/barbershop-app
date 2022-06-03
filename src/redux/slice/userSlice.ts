import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces";

interface UserState {
  isLoggedIn: boolean;
  currentUser: User | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<object>) => {
      state.currentUser = action.payload as User;
      state.isLoggedIn = true;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    createBooking: (state, action: PayloadAction<object>) => {
      // Pass
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
