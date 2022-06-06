import { FC } from "react";
import TopNav from "../components/TopNav";
import Box from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Typography from "@mui/material/Typography";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/slice/userSlice";

const SettingButton = styled(Button)<ButtonProps>(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  textTransform: "none",
  padding: theme.spacing(2),
  fontWeight: 400,
  borderRadius: 0,
  border: "none",
  borderTop: "1px solid #a1a1b2",
  color: "#202023",
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

const Account: FC = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    dispatch(logout());
  };

  return (
    <Box>
      <TopNav title="Account" navigateTo="/home" />
      <Box>
        <Box
          height="10vh"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={1}
            ml={2}
          >
            <Avatar
              alt={currentUser?.name}
              src="#"
              sx={{ width: 55, height: 55 }}
            />
            <Box>
              <Typography variant="body2">{currentUser?.name}</Typography>
              <Typography variant="body2">
                0{currentUser?.phone_number}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            size="small"
            sx={{
              width: "25%",
              borderRadius: 5,
              textTransform: "none",
              fontWeight: 400,
              color: "#76716d",
              backgroundColor: "#fff",
              border: "1px solid #76716d",
              marginRight: 2,
              "&:hover": {
                backgroundColor: "#b9afac",
                boxShadow: "none",
              },
              "&:active": {
                boxShadow: "none",
                backgroundColor: "#b9afac",
                borderColor: "#b9afac",
              },
            }}
            onClick={() => {
              console.log("edit account");
            }}
          >
            Edit Akun
          </Button>
        </Box>
        <ButtonGroup orientation="vertical" sx={{ width: "100%" }}>
          <SettingButton endIcon={<ArrowForwardIosIcon />}>
            Pengaturan Akun
          </SettingButton>
          <SettingButton endIcon={<ArrowForwardIosIcon />}>
            Pusat Bantuan
          </SettingButton>
          <SettingButton endIcon={<ArrowForwardIosIcon />}>
            Tentang
          </SettingButton>
          <SettingButton endIcon={<ArrowForwardIosIcon />}>
            Bahasa
          </SettingButton>
          <SettingButton
            endIcon={<ArrowForwardIosIcon />}
            onClick={handleLogout}
          >
            Keluar
          </SettingButton>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default Account;
