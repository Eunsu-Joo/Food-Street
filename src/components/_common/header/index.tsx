import Box from "@mui/material/Box";
import { AppBar, Avatar, Button, IconButton, Stack, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Typography, Menu, MenuItem } from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase } from "./header.style";
import Nav from "./nav";
import React, { useState, MouseEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { green } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import PATH from "../../../constants/path";
import useModal from "../../../hooks/useModal";
import LogoutModal from "../modal/logoutModal";
const Header = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const navigator = useNavigate();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onToggle = () => {
    setIsToggle(!isToggle);
  };
  const { user } = useUser();
  const { isOpen, controller } = useModal();
  const handleClose = () => setAnchorEl(null);
  const handleProfile = () => {
    handleClose();
    navigator(PATH.PROFILE);
  };
  const handleChangePw = () => {
    handleClose();
    navigator(PATH.RESET_PW);
  };
  const handleLogout = () => {
    handleClose();
    controller();
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, color: "#fff" }}>
        <AppBar position={"fixed"}>
          <Toolbar>
            <IconButton size={"large"} edge={"start"} color={"inherit"} aria-label={"open drawer"} sx={{ mr: 2 }} onClick={onToggle}>
              {isToggle ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
              <Link to={PATH.HOME} style={{ textDecoration: "initial", color: "inherit" }}>
                맛집을 자랑해 봅시다
              </Link>
            </Typography>
            {user && (
              <div>
                <Button sx={{ color: "#fff", fontSize: 18 }} id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: green[500],
                      fontWeight: 600,
                      mr: 2
                    }}
                  >
                    {user.user.username.charAt(0).toUpperCase()}
                  </Avatar>
                  WELCOME, {user.user.username}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button"
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                  }}
                >
                  <MenuItem onClick={handleProfile}>프로필💕</MenuItem>
                  <MenuItem onClick={handleChangePw}>비밀번호 변경🤡</MenuItem>
                  <MenuItem onClick={handleLogout}>로그아웃💨</MenuItem>
                </Menu>
              </div>
            )}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="검색어를 입력해 주세요…" inputProps={{ "aria-label": "search" }} />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <Nav isToggle={isToggle} onToggle={onToggle} />
      {isOpen && <LogoutModal onToggle={controller} isOpen={isOpen} />}
    </>
  );
};
export default Header;
