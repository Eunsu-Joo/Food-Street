import React, { useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import LoupeIcon from "@mui/icons-material/Loupe";
import { useNavigate } from "react-router-dom";
import { StyledNav } from "./nav.style";
import useUser from "../../../../hooks/useUser";
import InfoIcon from "@mui/icons-material/Info";
import PATH from "../../../../constants/path";
import type NavProps from "./nav.interface";
import LogoutIcon from "@mui/icons-material/Logout";
import useModal from "../../../../hooks/useModal";
import LogoutModal from "../../modal/logoutModal";
import PersonIcon from "@mui/icons-material/Person";
const Nav = ({ isToggle, onToggle }: NavProps) => {
  const navigate = useNavigate();
  const navRef = useRef<null | HTMLElement>(null);
  const onClick = (path: string) => {
    onToggle();
    navigate(path);
  };
  const { user } = useUser();

  const NAV_LIST = [
    {
      label: "홈",
      icon: <HomeIcon />,
      path: PATH.HOME
    },
    {
      label: "글쓰기",
      icon: <LoupeIcon />,
      path: PATH.ADD_POST
    }
  ];
  return (
    <StyledNav isToggle={isToggle}>
      <List component="nav" aria-label="mailbox folders" ref={navRef}>
        {NAV_LIST.map((item, index) => (
          <div key={index}>
            <ListItem button onClick={() => onClick(item.path)} sx={{ display: "flex", alignItems: "center" }}>
              {item.icon}
              <ListItemText primary={item.label} sx={{ pl: 2, fontWeight: 600 }} />
            </ListItem>
            <Divider />
          </div>
        ))}
        <div>
          <ListItem button onClick={() => (user ? onClick(PATH.PROFILE) : onClick(PATH.LOGIN))} sx={{ display: "flex", alignItems: "center" }}>
            {user ? <InfoIcon /> : <PersonIcon />}
            <ListItemText primary={user ? "프로필" : "로그인"} sx={{ pl: 2 }} />
          </ListItem>
          <Divider />
        </div>
      </List>
    </StyledNav>
  );
};
export default Nav;
