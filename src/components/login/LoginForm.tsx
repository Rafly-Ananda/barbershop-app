import { FC } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

interface FormProps {
  handleLogin: () => void;
  phoneNumber: number;
  setPhoneNumber: React.Dispatch<React.SetStateAction<number>>;
}

const LoginForm: FC<FormProps> = ({
  handleLogin,
  phoneNumber,
  setPhoneNumber,
}) => {
  return (
    <Box>
      <Typography
        fontWeight="light"
        variant="subtitle1"
        color="#fff"
        letterSpacing={1}
      >
        Please enter your phone number
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="space-evenly">
        <Box>
          <Typography
            fontWeight="light"
            variant="subtitle1"
            color="#fff"
            letterSpacing={1}
          >
            +62
          </Typography>
        </Box>
        <Box>
          <TextField
            id="phone_number"
            name="phone_number"
            variant="standard"
            type="number"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            sx={{ input: { color: "white" } }}
            onChange={(e) => setPhoneNumber(Number(e.target.value))}
          />
        </Box>
      </Box>
      <Box mt={6} display="flex" justifyContent="center">
        <Button
          variant="outlined"
          size="medium"
          sx={{
            width: "90%",
            padding: 1,
            borderRadius: 5,
            textTransform: "none",
            borderColor: "#fff",
            lineHeight: 2,
            fontSize: 15,
            fontWeight: "light",
            color: "#fff",
          }}
          onClick={handleLogin}
          disabled={String(phoneNumber).length < 10}
        >
          Masuk
        </Button>
      </Box>
      <Box mt={1} display="flex" justifyContent="center">
        <Typography
          mr={0.5}
          fontWeight={200}
          variant="subtitle2"
          color="#fff"
          letterSpacing={1}
        >
          Belum punya akun?
        </Typography>
        <Link
          to="/register"
          style={{
            textDecoration: "none",
          }}
        >
          <Typography
            fontWeight={200}
            variant="subtitle2"
            color="#fff"
            letterSpacing={1}
          >
            Daftar
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
