import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
const BOTTOM_APP_LIST = [
  { label: "Login", path: "/login", icon: <AccountCircleIcon /> },
  { label: "Home", path: "/", icon: <HomeIcon /> },
  { label: "Add Post", path: "/add_post", icon: <ControlPointIcon /> },
];
const BottomBar = () => {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        {BOTTOM_APP_LIST.map((item, index) => (
          <BottomNavigationAction
            label={item.label}
            onClick={() => navigate(item.path)}
            icon={item.icon}
            key={index}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
export default BottomBar;
