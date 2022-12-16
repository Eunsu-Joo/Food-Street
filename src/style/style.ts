import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Noto Sans KR", "Roboto", "Montserrat"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        a{
        text-decoration:initial;
        color:inherit
      `,
    },
  },
});

export default theme;
