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

const Header = () => {
  const [isToggle, setIsToggle] = useState(false);
  const onToggle = () => {
    setIsToggle(!isToggle);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, color: "#fff" }}>
        <AppBar position={"fixed"}>
          <Toolbar>
            <IconButton
              size={"large"}
              edge={"start"}
              color={"inherit"}
              aria-label={"open drawer"}
              sx={{ mr: 2 }}
              onClick={onToggle}
            >
              {isToggle ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              맛집을 자랑해 봅시다
            </Typography>
            <Stack direction={"row"} alignItems={"center"}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: green[500],
                  fontWeight: 600,
                }}
              >
                A
              </Avatar>
              <Typography fontSize={18} ml={2} mr={4}>
                Welcome, 안젤라!
              </Typography>
            </Stack>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="검색어를 입력해 주세요…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <Nav isToggle={isToggle} onToggle={onToggle} />
    </>
  );
};
export default Header;
