import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import React from "react";

type TextFieldBoxProps = {
  children: React.ReactNode;
  label: string;
  sx?: any;
};

const TextFieldBox = ({ children, label, sx }: TextFieldBoxProps) => {
  return (
    <Box sx={{ mb: 4, ...sx }}>
      <Typography component="p" fontSize={16} mb={1} color={"rgba(0, 0, 0, 0.6)"} fontWeight={500}>
        {label}
        <Typography component={"span"} color={"primary"} fontWeight={700} fontSize={18}>
          *
        </Typography>
      </Typography>
      {children}
    </Box>
  );
};
export default TextFieldBox;
