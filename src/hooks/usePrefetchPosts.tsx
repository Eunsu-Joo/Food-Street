import { useQuery, useQueryClient } from "react-query";
import httpModules from "../utils/httpModules";
import { useEffect, useRef } from "react";
import PAGE from "../constants/page";
import { useLocation, useNavigate } from "react-router-dom";
const usePrefetchPosts = (currentPage: number) => {
  const maxCount = useRef(1);
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const { data, isLoading } = useQuery(
    ["pre-posts", currentPage],
    () => httpModules.getPosts(currentPage),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    let length = 1;
    if (currentPage === PAGE.START && data) {
      maxCount.current = Math.ceil(data.pagination.total / PAGE.MAX_PAGE);
      length =
        maxCount.current < PAGE.PAGINATION_MAX
          ? maxCount.current
          : PAGE.PAGINATION_MAX;
      Array.from({ length }).map((_, index) => {
        queryClient.prefetchQuery(
          ["pre-posts", index + 1],
          () => httpModules.getPosts(index + 1),
          {
            cacheTime: 1000 * 60 * 10,
            staleTime: 1000 * 60 * 10,
          }
        );
      });
    } else if (currentPage > PAGE.PAGINATION_MAX) {
      if (currentPage === maxCount.current) return;
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(
        ["pre-posts", nextPage],
        () => httpModules.getPosts(nextPage),
        {
          cacheTime: 1000 * 60 * 10,
          staleTime: 1000 * 60 * 10,
        }
      );
    }
  }, [data]);
  return { data, isLoading };
};
export default usePrefetchPosts;
