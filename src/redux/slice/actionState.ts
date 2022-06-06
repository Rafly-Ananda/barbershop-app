import { createSlice } from "@reduxjs/toolkit";

interface ActionState {
  start: boolean;
  error: boolean;
}

const initialState: ActionState = {
  start: false,
  error: false,
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    actionStart: (state) => {
      state.start = true;
      state.error = false;
    },
    actionFailure: (state) => {
      state.start = false;
      state.error = true;
    },
    actionSuccess: (state) => {
      state.start = false;
      state.error = false;
    },
  },
});

export const { actionStart, actionFailure, actionSuccess } = stateSlice.actions;
export default stateSlice.reducer;
