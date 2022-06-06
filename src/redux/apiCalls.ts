import { login, logout } from "./slice/userSlice";
import { actionStart, actionFailure, actionSuccess } from "./slice/actionState";
import axios from "axios";

export const userLogin = async (
  dispatch: any,
  userPhone: number
): Promise<void> => {
  dispatch(actionStart());
  try {
    const { data } = await axios.post("/api/otp", { to: userPhone });
    dispatch(login(data.user));
    dispatch(actionSuccess());
  } catch (e) {
    dispatch(actionFailure());
  }
};
