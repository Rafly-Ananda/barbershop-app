import { FC } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";

interface UserForm {
  phone_number: number;
  name: string;
  email: string;
}

interface RegisterProps {
  userForm: UserForm;
  setUserForm: React.Dispatch<React.SetStateAction<UserForm>>;
  handleRegister: () => Promise<void>;
}

const RegisterForm: FC<RegisterProps> = ({ userForm, setUserForm }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      boxShadow={5}
      borderRadius={4}
      gap={1}
      sx={{
        backgroundColor: "#fff",
        width: "70%",
        height: "45%",
        "@media (min-width: 1300px)": {
          width: "50%",
          height: "40%",
        },
      }}
    >
      <Box>
        <InputLabel shrink htmlFor="phone_number">
          Phone Number
        </InputLabel>
        <TextField
          hiddenLabel
          id="phone_number"
          name="phone_number"
          variant="filled"
          type="number"
          size="small"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          InputProps={{ disableUnderline: true }}
          sx={{
            input: { background: "white" },
            backgroundColor: "#fff",
            border: "1px solid #bdbab5",
          }}
          onChange={(e) =>
            setUserForm((prev) => ({
              ...prev,
              [e.target.name]: Number(e.target.value),
            }))
          }
        />
      </Box>

      <Box>
        <InputLabel shrink htmlFor="name">
          Name
        </InputLabel>
        <TextField
          hiddenLabel
          id="name"
          name="name"
          variant="filled"
          type="text"
          size="small"
          sx={{
            input: { background: "white" },
            backgroundColor: "#fff",
            border: "1px solid #bdbab5",
          }}
          InputProps={{ disableUnderline: true }}
          onChange={(e) =>
            setUserForm((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
      </Box>

      <Box>
        <InputLabel shrink htmlFor="email">
          Email
        </InputLabel>
        <TextField
          hiddenLabel
          id="email"
          name="email"
          variant="filled"
          type="text"
          size="small"
          sx={{
            input: { background: "white" },
            backgroundColor: "#fff",
            border: "1px solid #bdbab5",
          }}
          InputProps={{ disableUnderline: true }}
          onChange={(e) =>
            setUserForm((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
      </Box>

      <Button
        variant="contained"
        size="medium"
        sx={{
          width: "50%",
          padding: 1,
          marginTop: 1,
          borderRadius: 5,
          textTransform: "none",
          lineHeight: 2,
          fontSize: 15,
          fontWeight: "light",
          color: "#fff",
          backgroundColor: "#76716d",
        }}
        // onClick={handleLogin}
        // disabled={String(phoneNumber).length < 10}
      >
        Masuk
      </Button>

      <Box mt={1} display="flex" justifyContent="center">
        <Typography
          mr={0.5}
          fontWeight={200}
          variant="subtitle2"
          color="#76716d"
          letterSpacing={1}
        >
          Sudah punya akun?
        </Typography>
        <Link
          to="/login"
          style={{
            textDecoration: "none",
          }}
        >
          <Typography
            fontWeight={200}
            variant="subtitle2"
            color="#76716d"
            letterSpacing={1}
          >
            Masuk
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default RegisterForm;
