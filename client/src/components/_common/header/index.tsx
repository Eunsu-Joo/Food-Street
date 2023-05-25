import { ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import UserToggle from "./UserToggle";
import { AppBar, Button, Container, Stack, Toolbar, Typography, Box, IconButton, styled, InputBase } from "@mui/material";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PATH from "../../../constants/path";
import useUser from "../../../hooks/useUser";
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& input::placeholder": {
    fontSize: "14px",
    fontWeight: 400
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 0.5, 0),
    transition: theme.transitions.create("width"),
    borderBottom: "1px solid white",
    [theme.breakpoints.up("sm")]: {
      width: "26ch",
      "&:focus": {
        width: "30ch"
      }
    }
  }
}));
const Header = () => {
  const [searchParams, _] = useSearchParams();
  const [isSearch, setIsSearch] = useState(!!searchParams.get("keyword"));
  const [search, setSearch] = useState(searchParams.get("keyword") ?? "");
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const { user } = useUser();

  const currentLinkStyle = {
    fontWeight: 700,
    textDecoration: "underline"
  };

  const onToggleSearch = () => {
    setIsSearch((prev) => !prev);
    setSearch("");
  };

  const handleLogin = () => {
    navigator(PATH.LOGIN);
  };

  const handleSearch = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    navigator(`${PATH.SEARCH}?keyword=${search}`, { preventScrollReset: true });
  };

  return (
    <AppBar position={"static"}>
      <Container maxWidth={"lg"}>
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
              <Link to={PATH.HOME} style={pathname === PATH.HOME || pathname === PATH.PREFETCH ? currentLinkStyle : undefined}>
                홈
              </Link>
              <Link to={PATH.ADD_POST} style={{ ...(pathname === PATH.ADD_POST ? currentLinkStyle : undefined), marginLeft: "16px" }}>
                글쓰기
              </Link>
            </Stack>
          </Box>
          <Box display={"flex"} alignItems={"center"} component={"form"} onSubmit={handleSearch}>
            {isSearch && <StyledInputBase value={search} onChange={(e) => setSearch(e.target.value)} placeholder="검색어를 입력해 주세요…" inputProps={{ "aria-label": "search" }} />}
            <IconButton color={"inherit"} aria-label="upload picture" component="label" onClick={onToggleSearch}>
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
