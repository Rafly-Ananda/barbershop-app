import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useAppSelector } from "../redux/hooks";
import Navigation from "./Navigation";

const Layout: FC = () => {
  const user = useAppSelector((state) => state.user.currentUser);

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
            "@media (min-width: 1000px)": {
              width: "30%",
            },
            background: user
              ? "#fff"
              : "linear-gradient(to bottom, #817c78, #21201e)",
            overflowX: "hidden",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "0",
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
        >
          <Outlet />
          {user && <Navigation />}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
