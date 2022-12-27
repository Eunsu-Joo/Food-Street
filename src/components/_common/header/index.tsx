import { AppBar, Button, Container, Stack, Toolbar, Typography, Box } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, SearchIconWrapper, StyledInputBase } from "./header.style";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import useUser from "../../../hooks/useUser";
import PATH from "../../../constants/path";
import UserToggle from "./userToggle";

const Header = () => {
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const { user } = useUser();

  const handleLogin = () => {
    navigator(PATH.LOGIN);
  };

  const currentLinkStyle = (path: string) => ({
    fontWeight: pathname === path ? 700 : 400,
    textDecoration: pathname === path ? "underline" : "initial"
  });

  return (
    <>
      <AppBar position={"static"} sx={{ color: "#fff" }}>
        <Container maxWidth={"xl"}>
          <Toolbar sx={{ padding: { sm: 0 } }}>
            <Box flexGrow={1} alignItems={"center"} sx={{ display: { xs: "none", md: "flex" } }}>
              <Typography variant="h4" fontWeight={600} fontFamily={"poppins"} noWrap component="div">
                <Link to={PATH.HOME} style={{ display: "inline-flex", alignItems: "center" }}>
                  Food Street
                  <RamenDiningIcon sx={{ ml: 1 }} fontSize={"medium"} />
                </Link>
              </Typography>
              <Stack flexDirection={"row"} fontSize={22} ml={3}>
                <Link to={PATH.HOME} style={currentLinkStyle(PATH.HOME)}>
                  홈
                </Link>
                <Link to={PATH.ADD_POST} style={{ ...currentLinkStyle(PATH.ADD_POST), marginLeft: "16px" }}>
                  글쓰기
                </Link>
              </Stack>
            </Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon fontSize={"medium"} />
              </SearchIconWrapper>
              <StyledInputBase placeholder="검색어를 입력해 주세요…" inputProps={{ "aria-label": "search" }} />
            </Search>
            {user ? (
              <UserToggle user={user} />
            ) : (
              <Button onClick={handleLogin} variant={"outlined"} sx={{ ml: 2, display: { xs: "none", sm: "inline-flex" } }} color={"inherit"} startIcon={<AccountCircleIcon />} size={"large"}>
                로그인
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default Header;
