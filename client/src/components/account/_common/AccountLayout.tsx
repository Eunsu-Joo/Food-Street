import React from "react";
import { Typography } from "@mui/material";
import { Container, styled } from "@mui/material";
import Box from "@mui/material/Box";
interface LoginLayoutProps {
  children: React.ReactNode;
  title: string;
}

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

const AccountLayout = ({ children, title }: LoginLayoutProps) => {
  return (
    <LoginContainer maxWidth={"sm"} sx={{ px: 0 }}>
      <StyledBox sx={{ pt: { xs: 2.5, sm: 5 }, pb: 10, px: { xs: 2, sm: 4 } }}>
        <Typography fontWeight={700} component={"h3"} fontSize={{ xs: 28, sm: 38 }} fontFamily={"Roboto"} textTransform={"uppercase"} textAlign={"center"} display={"flex"} flexDirection={"column"} position={"relative"} mb={{ xs: 2, sm: 4 }}>
          {title}
          <span className={"grater"} />
        </Typography>
        {children}
      </StyledBox>
    </LoginContainer>
  );
};
export default AccountLayout;
