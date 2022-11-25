import { createTheme } from "@mui/material";
import { blue, green, grey, red } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: ["Noto Sans KR", "Roboto", "Montserrat"].join(","),
  },
});

export default theme;
