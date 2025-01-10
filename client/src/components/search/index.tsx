import { useLocation, useSearchParams } from "react-router-dom";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { InfiniteData, useInfiniteQuery, useQueryClient } from "react-query";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import QUERY_KEYS from "../../constants/querykeys";
import fetcher from "../../graphql/fetcher";
import { GET_POSTS, GET_SEARCH_POSTS } from "../../graphql/posts";
import { PostDataType, SearchDataType } from "../../types/post";
import Error from "../_common/error";
import Loading from "../_common/loading";
import SearchPostList from "../_common/postList/SearchPostList";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    filter: "latest"
  });
  const keyword = searchParams.get("keyword") as string;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, filter: event.target.value as string });
  };
  const queryClient = useQueryClient();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInfiniteScroll({ ref });
  const { data, isLoading, isFetchingNextPage, isFetching, isError, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [QUERY_KEYS.POSTS, searchParams.get("keyword"), searchParams.get("filter")],
    ({ pageParam = 1 }) => {
      return fetcher(GET_SEARCH_POSTS, { pageParam, keyword: searchParams.get("keyword"), filter: searchParams.get("filter") });
    },
    {
      getNextPageParam: (_lastPage: SearchDataType, pages) => {
        if (pages.length + 1 > _lastPage.getSearchPosts.pageCount) return 1;
        return pages.length + 1;
      },
      staleTime: 0,
      cacheTime: 1000 * 60 * 3
    }
  );
  useEffect(() => {
    (async () => {
      if (!hasNextPage || !inView || isFetchingNextPage || isFetching || isLoading) return;
      await fetchNextPage();
    })();
  }, [inView]);

  if (isError) return <Error />;
  return (
    <>
      {isFetching && !isLoading && !hasNextPage && <Loading />}
      <SearchPostList defaultFilter={searchParams.get("filter") as string} handleChange={handleChange} data={data as InfiniteData<SearchDataType>} isFetching={isFetchingNextPage} />
      <div ref={ref} style={{ display: !isError ? "block" : "none" }} />
    </>
  );
};
export default Search;
