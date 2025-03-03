import { styled } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const Textarea = styled(TextareaAutosize)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: "4px",
  paddingLeft: "8px",
  paddingTop: "8px",
  fontSize: "16px",
  fontFamily: "Noto Sans KR,sans-serif",
  "&:focus": {
    outlineColor: theme.palette.primary.main
  },
  "&::placeholder": {
    color: theme.palette.grey[400],
    fontWeight: 400
  },
  "&::hover": {
    borderColor: "#000"
  }
}));

export default Textarea;
