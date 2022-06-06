import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TopNav from "../components/TopNav";
import RegisterForm from "../components/RegisterForm";
import { useAppSelector } from "../redux/hooks";
import axios from "axios";

interface UserForm {
  phone_number: number;
  name: string;
  email: string;
}

const Register: FC = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState<UserForm>({
    phone_number: 0,
    name: "",
    email: "",
  });

  const handleRegister = async (): Promise<void> => {
    try {
      await axios.post("/api/register", userForm);
      navigate("/login", { replace: true });
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  };

  useEffect(() => {
    currentUser && navigate("/home");
  }, []);

  return (
    <Box sx={{ backgroundColor: "#fff", height: "100%" }}>
      <TopNav title="Daftar" navigateTo="/login" />
      <RegisterForm
        userForm={userForm}
        setUserForm={setUserForm}
        handleRegister={handleRegister}
      />
    </Box>
    // <Box
    //   height="100%"
    //   width="100%"
    //   display="flex"
    //   justifyContent="center"
    //   alignItems="center"
    // >
    //   <RegisterForm
    //     userForm={userForm}
    //     setUserForm={setUserForm}
    //     handleRegister={handleRegister}
    //   />
    // </Box>
  );
};

export default Register;
