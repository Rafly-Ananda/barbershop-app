import { FC } from "react";
import { Link } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";

const Navigation: FC = () => {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        "@media (min-width: 1300px)": {
          left: "35%",
          right: "35%",
        },
      }}
      elevation={3}
    >
      <BottomNavigation>
        <BottomNavigationAction
          component={Link}
          to="/home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/history"
          icon={<MenuBookIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/account"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Navigation;
