import { styled } from "@mui/material";
import React from "react";
type NavStyledProps = {
  isToggle: boolean;
  children: React.ReactNode;
};

const StyledNav = styled("div")<NavStyledProps>(({ theme, isToggle }) => ({
  width: "100%",
  maxWidth: 360,
  height: "calc(100vh - 120px)",
  position: "fixed",
  top: "64px",
  left: `${isToggle ? "0px" : "-360px"}`,
  zIndex: 10,
  transition: "left 0.5s ",
  boxShadow: theme.shadows[2],
  backgroundColor: "#fff"
}));

export { StyledNav };
