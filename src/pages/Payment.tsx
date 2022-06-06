import { FC } from "react";
import Box from "@mui/material/Box";
import TopNav from "../components/TopNav";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button, { ButtonProps } from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Gopay from "../assets/gopay.png";
import { useAppDispatch } from "../redux/hooks";
import { setBookingCart } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";

const PaymentButton = styled(Button)<ButtonProps>(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  textTransform: "none",
  padding: theme.spacing(2),
  fontWeight: 400,
  borderRadius: theme.spacing(2),
  border: "none",
  borderTop: "1px solid #a1a1b2",
  color: "#202023",
  backgroundColor: "#fff",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#b9afac",
    boxShadow: "none",
    border: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#b9afac",
    borderColor: "#b9afac",
  },
}));

const Payment: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlePaymentMethod = (method: string): void => {
    dispatch(setBookingCart({ field: "payment", value: method }));
    navigate("/book", { replace: true });
  };

  return (
    <Box>
      <TopNav title="Payment" navigateTo="/book" />
      <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
        <Typography>Mohon pilih metode pembayaran</Typography>
      </Box>
      <Box mt={4} p={3} display="flex" flexDirection="column" gap={2}>
        <PaymentButton
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIosIcon />}
          sx={{ boxShadow: 3 }}
          onClick={() => handlePaymentMethod("gopay")}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar src={Gopay} />
            <Typography variant="h5" fontWeight="800">
              gopay
            </Typography>
          </Box>
        </PaymentButton>
        <PaymentButton
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIosIcon />}
          sx={{ boxShadow: 3 }}
          onClick={() => handlePaymentMethod("Bank Transfer")}
        >
          Bank Transfer
        </PaymentButton>
      </Box>
      <Box
        sx={{
          position: "absolute",
          height: "12vh",
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "#fff",
          zIndex: 99,
        }}
      ></Box>
    </Box>
  );
};

export default Payment;
