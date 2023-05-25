import React, { ReactNode } from "react";
import { Container } from "@mui/material";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container sx={{ pt: 3 }} maxWidth={"lg"}>
      {children}
    </Container>
  );
};
export default React.memo(MainLayout);
