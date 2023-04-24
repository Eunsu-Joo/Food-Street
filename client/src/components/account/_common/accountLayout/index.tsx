import React from "react";
import { Typography } from "@mui/material";
import { LoginContainer, StyledBox } from "./accountLayout.style";

interface LoginLayoutProps {
  children: React.ReactNode;
  title: string;
}

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
