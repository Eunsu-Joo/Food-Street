import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { styled, Theme } from "@mui/material";
import React, { ReactNode } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ReviewsIcon from "@mui/icons-material/Reviews";
import LoupeIcon from "@mui/icons-material/Loupe";
import { useNavigate } from "react-router-dom";
type DivProps = {
  isToggle: boolean;
  children: React.ReactNode;
};

const StyledNav = styled("div")<DivProps>(({ theme, isToggle }) => ({
  width: "100%",
  maxWidth: 360,
  height: "calc(100vh - 120px)",
  backgroundColor: theme.palette.common.white,
  position: "fixed",
  top: "64px",
  left: `${isToggle ? "0px" : "-360px"}`,
  zIndex: 10,
  transition: "left 0.5s ",
}));
// "Home","Add Index","Reviews","SelectUser"
const NAV_LIST = [
  {
    label: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    label: "Add Post",
    icon: <LoupeIcon />,
    path: "/add_post",
  },
  {
    label: "Login",
    icon: <PersonIcon />,
    path: "/login",
  },
];

const Nav = ({
  isToggle,
  onToggle,
}: {
  isToggle: boolean;
  onToggle: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <StyledNav isToggle={isToggle}>
      <List component="nav" aria-label="mailbox folders">
        {NAV_LIST.map((item, index) => (
          <div key={index}>
            <ListItem
              button
              onClick={() => {
                onToggle();
                navigate(item.path);
              }}
              sx={{ display: "flex", alignItems: "center" }}
            >
              {item.icon}
              <ListItemText primary={item.label} sx={{ pl: 2 }} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </StyledNav>
  );
};
export default Nav;
