import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { links } from "../../../../data";
import React, { ReactNode } from "react";
type ButtonColorProps = "primary" | "secondary" | "success";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Stack direction={"row"} justifyContent={"center"}>
        {links.map((link) => (
          <Link to={link.to} style={{ textDecoration: "none" }} key={link.to}>
            <Button
              variant={"outlined"}
              color={link.color as ButtonColorProps}
              sx={{ mr: 2 }}
            >
              {link.title}
            </Button>
          </Link>
        ))}
      </Stack>
      {children}
    </>
  );
};
export default React.memo(Layout);
