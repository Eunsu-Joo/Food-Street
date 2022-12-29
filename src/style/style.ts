import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Noto Sans KR", "Roboto", "Montserrat"].join(",")
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      *{
        margin:0;
        padding:0
      }
        a{
        text-decoration:initial;
        color:inherit
      `
    }
  }
});

export default theme;
