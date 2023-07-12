import React, { ReactNode } from "react";
import { Container } from "@mui/material";
import useUser from "../../../hooks/useUser";
import { Navigate, useLocation } from "react-router-dom";
import PATH from "../../../constants/path";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container sx={{ pt: 10, pb: { xs: 6 } }} maxWidth={"lg"}>
      {children}
    </Container>
  );
};
export default React.memo(MainLayout);
