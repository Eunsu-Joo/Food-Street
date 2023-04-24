import { styled } from "@mui/material";
import Box from "@mui/material/Box";

const EmailInputBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "end",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    ".font": {
      fontSize: "16px"
    },
    ".emailAddress": {
      marginTop: "14px"
    }
  }
}));
export default EmailInputBox;
