import Box from "@mui/material/Box";
import { Theme, Typography } from "@mui/material";
import React from "react";

type TextFieldBoxProps = {
  children: React.ReactNode;
  label: string;
  sx?: any;
};

const TextFieldBox = ({ children, label, sx }: TextFieldBoxProps) => {
  return (
    <Box sx={{ mt: 4, ...sx }}>
      <Typography
        component="p"
        fontSize={16}
        mb={1}
        color={"rgba(0, 0, 0, 0.6)"}
        fontWeight={500}
      >
        {label}{" "}
        <Typography
          component={"span"}
          color={(theme: Theme) => theme.palette.primary.main}
        >
          *
        </Typography>
      </Typography>
      {children}
    </Box>
  );
};
export default TextFieldBox;
