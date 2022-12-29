import { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "react-query";
import fetcher from "../utils/fetcher";
import QUERY_KEYS from "../constants/querykeys";
import PAGE from "../constants/page";
import type { UsePostsProps } from "../types/hooks";

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
  const maxCount = useRef<null | number>(null); //페이지네이션 count

  const fallback = {
    data: [],
    pagination: {}
  }; //기본 설정

  const queryKey = isPrefetch ? QUERY_KEYS.PRE_POSTS : QUERY_KEYS.POSTS;

  const { data = fallback, isLoading } = useQuery([queryKey, currentPage], () => getPosts(currentPage), {
    select: (data) => {
      const pagination = data.meta.pagination;
      return { data: data.data, pagination };
    } // posts data 가공
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
