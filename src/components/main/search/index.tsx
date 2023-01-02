import { useLocation } from "react-router-dom";

const Search = () => {
  const search = useLocation().search;
  const keyword = new URLSearchParams(search).get("keyword") as string;

  return <div>{keyword}</div>;
};
export default Search;
