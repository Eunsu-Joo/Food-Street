import Box from "@mui/material/Box";
import { AppBar, Avatar, IconButton, Stack, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase } from "./header.style";
import Nav from "./nav";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { green } from "@mui/material/colors";
import { Link } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import PATH from "../../../constants/path";

const Header = () => {
  const [isToggle, setIsToggle] = useState(false);
  const onToggle = () => {
    setIsToggle(!isToggle);
  };
  const { user } = useUser();
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
              <Link to={PATH.USER_INFO}>
                <Stack direction={"row"} alignItems={"center"}>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: green[500],
                      fontWeight: 600
                    }}
                  >
                    {user.user.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography fontSize={18} ml={2} mr={2} color={"inherit"}>
                    WELCOME, {user.user.username} ✨
                  </Typography>
                </Stack>
              </Link>
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
    </>
  );
};
export default Header;
