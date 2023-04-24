import React, { ReactNode } from "react";
import { Box } from "@mui/material";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return <Box pb={{ xs: 10 }}>{children}</Box>;
};
export default React.memo(MainLayout);
