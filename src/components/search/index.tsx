import { useLocation, useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";
import useDebounce from "../../hooks/useDebounce";

const Search = () => {
  const [searchParams, _] = useSearchParams();
  const keyword = searchParams.get("keyword") as string;
  const { isDebounce, setIsDebounce } = useDebounce();

  return <div>{keyword}</div>;
};
export default Search;
