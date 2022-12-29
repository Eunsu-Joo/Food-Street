import { InputBase, styled } from "@mui/material";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& input::placeholder": {
    fontSize: "14px",
    fontWeight: 400
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 0.5, 0),
    transition: theme.transitions.create("width"),
    borderBottom: "1px solid white",
    [theme.breakpoints.up("sm")]: {
      width: "26ch",
      "&:focus": {
        width: "30ch"
      }
    }
  }
}));
export { StyledInputBase };
