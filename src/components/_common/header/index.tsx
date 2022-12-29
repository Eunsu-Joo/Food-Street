import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import UserToggle from "./userToggle";
import { StyledInputBase } from "./header.style";
import { AppBar, Button, Container, Stack, Toolbar, Typography, Box, IconButton } from "@mui/material";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PATH from "../../../constants/path";

const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const { user } = useUser();

  const onToggleSearch = () => setIsSearch((prev) => !prev);

  const handleLogin = () => {
    navigator(PATH.LOGIN);
  };

  const currentLinkStyle = (path: string) => ({
    fontWeight: pathname === path ? 700 : 400,
    textDecoration: pathname === path ? "underline" : "initial"
  });

  return (
    <AppBar position={"static"}>
      <Container maxWidth={"xl"}>
        <Toolbar sx={{ padding: { xs: 0 }, color: "#fff" }}>
          <Box flexGrow={1} alignItems={"center"} display={"flex"}>
            <Link to={PATH.HOME}>
              <Stack flexDirection={"row"} alignItems={"center"}>
                <Typography component={"span"} fontSize={30} fontWeight={600} fontFamily={"poppins"} noWrap display={{ xs: "none", md: "inline" }}>
                  Food Street
                </Typography>
                <RamenDiningIcon sx={{ ml: { xs: 0, sm: 1 }, mr: { xs: 2, sm: 0 } }} fontSize={"medium"} />
              </Stack>
            </Link>
            <Stack flexDirection={"row"} fontSize={22} ml={3} display={{ xs: "none", md: "flex" }}>
              <Link to={PATH.HOME} style={currentLinkStyle(PATH.HOME)}>
                홈
              </Link>
              <Link to={PATH.ADD_POST} style={{ ...currentLinkStyle(PATH.ADD_POST), marginLeft: "16px" }}>
                글쓰기
              </Link>
            </Stack>
          </Box>
          <Box display={"flex"} alignItems={"center"} component={"form"}>
            {isSearch && <StyledInputBase placeholder="검색어를 입력해 주세요…" inputProps={{ "aria-label": "search" }} />}
            <IconButton form={"submit"} color={"inherit"} aria-label="upload picture" component="label" onClick={onToggleSearch}>
              {isSearch ? <CloseIcon fontSize={"medium"} /> : <SearchIcon fontSize={"medium"} />}
            </IconButton>
          </Box>
          {user ? (
            <UserToggle user={user} />
          ) : (
            <Button onClick={handleLogin} variant={"outlined"} size={"large"} sx={{ ml: 2, display: { xs: "none", sm: "inline-flex" } }} color={"inherit"} startIcon={<AccountCircleIcon />}>
              로그인
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
