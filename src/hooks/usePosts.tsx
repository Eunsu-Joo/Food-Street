import { useQuery, useQueryClient } from "react-query";
import { useEffect, useRef } from "react";
import QUERY_KEYS from "../constants/querykeys";
import fetcher from "../utils/fetcher";
import PAGE from "../constants/page";

interface UsePostsProps {
  currentPage: number;
  isPrefetch: boolean;
}
const getPosts = async (currentPage: number) => {
  const { data } = await fetcher({
    url: "/store-posts",
    method: "get",
    params: {
      populate: "*",
      pagination: {
        page: currentPage,
        pageSize: PAGE.MAX_PAGE
      }
    }
  });
  return data;
};
const usePosts = ({ currentPage, isPrefetch }: UsePostsProps) => {
  const queryClient = useQueryClient();
  const maxCount = useRef<null | number>(null);
  const fallback = {
    data: [],
    pagination: {}
  };
  const queryKey = isPrefetch ? QUERY_KEYS.PRE_POSTS : QUERY_KEYS.POSTS;
  const { data = fallback, isLoading } = useQuery([queryKey, currentPage], () => getPosts(currentPage), {
    select: (data) => {
      const pagination = data.meta.pagination;
      return { data: data.data, pagination };
    }
  });

  useEffect(() => {
    if (!isPrefetch) return;
    if (data?.pagination) maxCount.current = data.pagination.pageCount;
    const nextPage = currentPage + 1;
    if (currentPage === maxCount.current) return;
    queryClient.prefetchQuery([QUERY_KEYS.PRE_POSTS, nextPage], () => getPosts(nextPage));
  }, [currentPage, queryClient]);

  return { data, isLoading };
};
export default usePosts;
