import { alpha, InputBase, styled } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "2rem",
  outline: "1px solid #fff",
  marginLeft: 0,
  width: "auto",
  [theme.breakpoints.down("md")]: {
    flexGrow: 1
    // marginLeft: theme.spacing(1),
    // width: "auto"
  }
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& input::placeholder": {
    fontSize: "14px",
    fontWeight: 400
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "80%",
    [theme.breakpoints.up("sm")]: {
      width: "24ch",
      "&:focus": {
        width: "30ch"
      }
    }
  }
}));
export { Search, SearchIconWrapper, StyledInputBase };
