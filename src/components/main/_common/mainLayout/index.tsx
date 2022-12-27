import { useNavigate } from "react-router-dom";
import { links } from "../../../../data";
import React, { ReactNode } from "react";
import { Box, Button, Stack } from "@mui/material";
type ButtonColorProps = "primary" | "secondary" | "success";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const navigator = useNavigate();
  const navigatePath = (path: string) => {
    navigator(path);
  };

  return (
    <Box pb={{ xs: 10 }}>
      <Stack flexDirection={{ xs: "column", sm: "row" }} justifyContent={"center"}>
        {links.map((link, index) => (
          <Button key={index} sx={{ mr: { xs: 0, sm: 1 }, mb: { xs: 1 } }} onClick={() => navigatePath(link.to)} color={link.color as ButtonColorProps} variant={"outlined"}>
            {link.title}
          </Button>
        ))}
      </Stack>
      {children}
    </Box>
  );
};
export default React.memo(MainLayout);
