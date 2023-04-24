import { Container, styled } from "@mui/material";
import Box from "@mui/material/Box";

const LoginContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  [theme.breakpoints.up("sm")]: {
    marginTop: "120px"
  }
}));
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey["A100"],
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.shadows[3],
  ".grater": {
    display: "inline-block",
    width: "15%",
    backgroundColor: theme.palette.primary.main,
    height: "0.1em",
    position: "absolute",
    left: "50%",
    bottom: "0%",
    transform: "translateX(-50%)"
  }
}));
export { LoginContainer, StyledBox };
