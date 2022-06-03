import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import logo from "../assets/logo.png";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../redux/hooks";
import Navigation from "./Navigation";

const ImageContainer = styled("div")(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(1),
  margin: theme.spacing(1),
}));

const Image = styled("img")(() => ({
  display: "block",
  width: "17vw",
}));

const Layout: FC = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  const location = useLocation();

  return (
    <Box
      sx={{
        background: "#bdbab5",
      }}
    >
      <CssBaseline />
      <Box
        maxHeight="100vh"
        maxWidth="100vw"
        display="flex"
        justifyContent="center"
      >
        <Box
          sx={{
            width: "100%",
            "@media (min-width: 1300px)": {
              width: "30%",
            },
            background: "linear-gradient(to bottom, #817c78, #21201e)",
            overflowY: "scroll",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-track": {
              background: "#7f7a76",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#575451",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
          position="relative"
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* <ImageContainer>
            <Image src={logo} srcSet={logo} loading="lazy" alt="main-logo" />
          </ImageContainer> */}
          <Outlet />
          {user && <Navigation />}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
