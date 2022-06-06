import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";

interface NavProps {
  title: string;
  navigateTo: string;
}

const TopNav: FC<NavProps> = ({ title, navigateTo }) => {
  const navigate = useNavigate();
  return (
    <Box
      height="8vh"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "#474342", position: "sticky", top: 0 }}
    >
      <Box flex={1}>
        <IconButton
          sx={{ marginLeft: 1 }}
          onClick={() => {
            navigate(navigateTo);
          }}
        >
          <ArrowBackIosNewIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Box>

      <Box display="flex" justifyContent="center" flex={2}>
        <Typography color="#fff" variant="subtitle1" fontWeight={200}>
          {title}
        </Typography>
      </Box>
      <Box flex={1} />
    </Box>
  );
};

export default TopNav;
