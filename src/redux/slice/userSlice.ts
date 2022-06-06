import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Booking } from "../../interfaces";

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
    login: (state, action: PayloadAction<object>) => {
      state.currentUser = action.payload as User;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
    setBookingCart: (
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      if (state.currentUser) {
        state.currentUser.booking_cart[action.payload.field as keyof Booking] =
          action.payload.value;
      }
    },
    createBooking: (state) => {
      if (state.currentUser) {
        state.currentUser.current_booking =
          state.currentUser?.booking_cart.invoice_id;

        state.currentUser.booking_cart = {
          invoice_id: "",
          barber_id: "",
          service_id: "",
          rating: "",
          date: "",
          time: "",
          price: "",
          payment: "",
          feedback: "",
        };
      }
    },
    resetCurrentBook: (state) => {
      if (state.currentUser) state.currentUser.current_booking = "";
    },
    refreshBookingHistory: (state, action: PayloadAction<Array<Booking>>) => {
      if (state.currentUser)
        state.currentUser.booking_history = [...action.payload];
    },
  },
});

export const {
  login,
  logout,
  setBookingCart,
  createBooking,
  resetCurrentBook,
  refreshBookingHistory,
} = userSlice.actions;
export default userSlice.reducer;
