import React, { useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LoupeIcon from "@mui/icons-material/Loupe";
import { useNavigate } from "react-router-dom";
import { StyledNav } from "./nav.style";
import useUser from "../../../../hooks/useUser";

interface NavProps {
  isToggle: boolean;
  onToggle: () => void;
}

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

const Nav = ({ isToggle, onToggle }: NavProps) => {
  const navigate = useNavigate();
  const navRef = useRef<null | HTMLElement>(null);
  const { user } = useUser();

  return (
    <StyledNav isToggle={isToggle}>
      <List component="nav" aria-label="mailbox folders" ref={navRef}>
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
