import { FC } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

interface FormProps {
  handleLogin: () => Promise<void>;
  phoneNumber: number;
  err: boolean;
  setPhoneNumber: React.Dispatch<React.SetStateAction<number>>;
}

const LoginForm: FC<FormProps> = ({
  setPhoneNumber,
  handleLogin,
  phoneNumber,
  err,
}) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
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
            type="tel"
            error={err}
            helperText={err && "Wrong number"}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 12,
            }}
            sx={{ input: { color: "white" } }}
            onChange={(e) => setPhoneNumber(Number(e.target.value))}
          />
        </Box>
      </Box>
      <Box mt={4} display="flex" justifyContent="center">
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
          onClick={handleLogin}
          disabled={String(phoneNumber).length < 11}
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
