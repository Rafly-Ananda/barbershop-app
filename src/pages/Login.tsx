import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import OTP from "../components/login/OTP";
import LoginForm from "../components/login/LoginForm";
import logo from "../assets/logo.png";
import { styled } from "@mui/material/styles";
import { login } from "../redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { User } from "../interfaces";
import Fade from "@mui/material/Fade";

const ImageContainer = styled("div")(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(1),
  margin: theme.spacing(1),
}));

const Image = styled("img")(() => ({
  display: "block",
  width: "17vw",
}));

const Login: FC = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<number>(0);
  const [loginAction, setLoginAction] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<User | null>();
  const [err, setErr] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [splash, setSplash] = useState<boolean>(true);

  const handleLogin = async (): Promise<void> => {
    try {
      const { data } = await axios.post("/api/otp", { to: phoneNumber });
      setLoggedUser(data.user);
      setLoginAction(true);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      setErr(true);
    }
  };

  const handleVerifyOTP = async (): Promise<void> => {
    try {
      await axios.post("/api/verifyOtp", { otp: otp });
      if (loggedUser) {
        dispatch(login(loggedUser));
        navigate("/home", { replace: true });
      }
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      setErr(true);
    }
  };

  setTimeout(() => {
    setSplash(false);
  }, 2000);

  useEffect(() => {
    currentUser && navigate("/home");
  }, []);

  return (
    <>
      {splash ? (
        <Box
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <ImageContainer>
            <Fade in={splash}>
              <Image src={logo} srcSet={logo} loading="lazy" alt="main-logo" />
            </Fade>
          </ImageContainer>
        </Box>
      ) : (
        <Box height="100%" width="100%" display="flex" justifyContent="center">
          {loginAction ? (
            <OTP
              otp={otp}
              phoneNumber={phoneNumber}
              setOtp={setOtp}
              setLoginAction={setLoginAction}
              handleVerifyOTP={handleVerifyOTP}
            />
          ) : (
            <LoginForm
              phoneNumber={phoneNumber}
              err={err}
              handleLogin={handleLogin}
              setPhoneNumber={setPhoneNumber}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default Login;
