import { useQuery, useQueryClient } from "react-query";
import httpModules from "../utils/httpModules";
import { useEffect } from "react";
import PAGE from "../constants/page";

const usePosts = (currentPage: number) => {
  const queryClient = useQueryClient();
  const fallback = {
    data: [],
    pagination: {},
  };
  const { data = fallback, isLoading } = useQuery(
    ["posts", currentPage],
    () => httpModules.getPosts(currentPage),
    {
      staleTime: 0,
      cacheTime: 1000 * 60 * 10,
    }
  );

  return { data, isLoading };
};
export default usePosts;
