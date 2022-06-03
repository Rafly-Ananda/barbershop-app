import { FC, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { User } from "../interfaces";

interface UserForm {
  phone_number: number;
  name: string;
  email: string;
}

const Register: FC = () => {
  const [userForm, setUserForm] = useState<UserForm>({
    phone_number: 0,
    name: "",
    email: "",
  });
  const handleRegister = async (): Promise<void> => {};

  console.log(userForm);

  return (
    <>
      <RegisterForm
        userForm={userForm}
        setUserForm={setUserForm}
        handleRegister={handleRegister}
      />
    </>
  );
};

export default Register;
