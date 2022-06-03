import { FC } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface OTPProps {
  setLoginAction: React.Dispatch<React.SetStateAction<boolean>>;
  phoneNumber: number;
}

const OTP: FC<OTPProps> = ({ setLoginAction, phoneNumber }) => {
  const numberToString = phoneNumber.toString();
  return (
    <Box>
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
            numberToString
              .slice(0, numberToString.length - 5)
              .padEnd(numberToString.length, "x")}
        </Typography>
      </Box>
    </Box>
  );
};

export default OTP;
