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

const RegisterForm: FC<RegisterProps> = ({
  setUserForm,
  handleRegister,
  userForm,
}) => {
  return (
    // <Box
    //   display="flex"
    //   flexDirection="column"
    //   alignItems="center"
    //   justifyContent="center"
    //   boxShadow={5}
    //   borderRadius={4}
    //   gap={1}
    //   p={2}
    //   sx={{
    //     backgroundColor: "#fff",
    //     minWidth: "70%",
    //     minHeight: "45%",
    //     "@media (min-width: 1300px)": {
    //       minWidth: "50%",
    //       minHeight: "40%",
    //     },
    //   }}
    // >
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="100%" p={4} display="flex" flexDirection="column" gap={2}>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          <InputLabel shrink htmlFor="phone_number">
            Phone Number
          </InputLabel>
          <TextField
            hiddenLabel
            id="phone_number"
            name="phone_number"
            variant="filled"
            type="tel"
            size="small"
            fullWidth
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 12,
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

        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
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
            fullWidth
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

        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
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
            fullWidth
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
      </Box>

      <Button
        variant="contained"
        size="small"
        sx={{
          width: "30%",
          borderRadius: 5,
          textTransform: "none",
          lineHeight: 2,
          fontWeight: "light",
          color: "#fff",
          backgroundColor: "#76716d",
          "&:hover": {
            backgroundColor: "#b9afac",
            borderColor: "transparent",
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
            backgroundColor: "#b9afac",
            borderColor: "#b9afac",
          },
        }}
        disabled={
          !userForm.email ||
          !userForm.name ||
          String(userForm.phone_number).length < 11
        }
        onClick={handleRegister}
      >
        Daftar
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
    // </Box>
  );
};

export default RegisterForm;
