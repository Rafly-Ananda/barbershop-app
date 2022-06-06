import { FC } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

interface OTPProps {
  phoneNumber: number;
  otp: string;
  setLoginAction: React.Dispatch<React.SetStateAction<boolean>>;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  handleVerifyOTP: () => Promise<void>;
}

const OTP: FC<OTPProps> = ({
  phoneNumber,
  otp,
  setOtp,
  setLoginAction,
  handleVerifyOTP,
}) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <IconButton
        sx={{ position: "absolute", top: 20, left: 20 }}
        onClick={() => {
          setLoginAction(false);
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography fontWeight="light" color="#fff" letterSpacing={1}>
          Please enter the OTP Code
        </Typography>
        <Typography fontWeight="light" color="#fff" letterSpacing={1}>
          sent to your phone
        </Typography>
        <Typography fontWeight="light" color="#fff" letterSpacing={1}>
          {"+62" +
            String(phoneNumber)
              .slice(0, String(phoneNumber).length - 5)
              .padEnd(String(phoneNumber).length, "x")}
        </Typography>
        <TextField
          id="phone_number"
          name="phone_number"
          variant="standard"
          type="tel"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 6,
            style: { textAlign: "center" },
          }}
          sx={{ input: { color: "white" }, marginTop: 2 }}
          onChange={(e) => setOtp(e.target.value)}
        />
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
            marginTop: 2,
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
          onClick={handleVerifyOTP}
          disabled={String(otp).length < 6}
        >
          Masuk
        </Button>
      </Box>
    </Box>
  );
};

export default OTP;
