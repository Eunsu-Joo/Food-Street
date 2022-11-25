import { Container, styled, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
type LoginLayoutProps = {
  children: React.ReactNode;
  title: string;
};
const LoginContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "calc(100vh - 120px)",
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
    transform: "translateX(-50%)",
  },
}));
const LoginLayout = ({ children, title }: LoginLayoutProps) => {
  return (
    <LoginContainer maxWidth={"sm"}>
      <StyledBox sx={{ pt: 5, pb: 10, px: 4 }}>
        <Typography
          fontWeight={700}
          component={"h3"}
          fontSize={38}
          fontFamily={"Roboto"}
          textTransform={"uppercase"}
          textAlign={"center"}
          display={"flex"}
          flexDirection={"column"}
          position={"relative"}
          mb={4}
        >
          {title}
          <span className={"grater"} />
        </Typography>
        {children}
      </StyledBox>
    </LoginContainer>
  );
};
export default LoginLayout;
