import { createTheme } from "@mui/material";
import { blue, green, grey, red } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: ["Noto Sans KR", "Roboto", "Montserrat"].join(","),
  },

  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: grey[600],
      light: grey[50],
    },
    action: {
      active: red[800],
    },
  },
});

export default theme;
