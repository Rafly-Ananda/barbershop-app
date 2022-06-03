import { FC, useState } from "react";
import OTP from "../components/login/OTP";
import LoginForm from "../components/login/LoginForm";

const Login: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<number>(0);
  const [loginAction, setLoginAction] = useState<boolean>(false);

  const handleLogin = (): void => {
    setLoginAction(true);
    console.log(phoneNumber);
  };

  return (
    <>
      {loginAction ? (
        <OTP setLoginAction={setLoginAction} phoneNumber={phoneNumber} />
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
        />
      )}
    </>
  );
};

export default Login;
