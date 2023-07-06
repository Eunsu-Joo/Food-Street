import MainLayout from "../_common/mainLayout";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { InfiniteData, useInfiniteQuery } from "react-query";
import QUERY_KEYS from "../../constants/querykeys";
import fetcher from "../../graphql/fetcher";
import { GET_POSTS } from "../../graphql/posts";
import { PostDataType } from "../../types/post";
import { Box, InputLabel, NativeSelect, Typography } from "@mui/material";
import PostList from "./postList";
import FormControl from "@mui/material/FormControl";
import Error from "../_common/error";
import NoResult from "./postList/noResult";
import { useSearchParams } from "react-router-dom";

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams({ filter: "latest" });
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ filter: event.target.value as string });
  };
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInfiniteScroll({ ref });
  const { data, isLoading, isFetchingNextPage, isFetching, isError, isLoadingError, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [QUERY_KEYS.POSTS],
    ({ pageParam = 1 }) => {
      return fetcher(GET_POSTS, { pageParam });
    },
    {
      getNextPageParam: (_lastPage: PostDataType, pages) => {
        if (pages.length + 1 > _lastPage.getPosts.pageCount) return;
        return pages.length + 1;
      },
      staleTime: 0,
      cacheTime: 1000 * 60 * 3
    }
  );

  useEffect(() => {
    (async () => {
      if (!hasNextPage || !inView || isFetchingNextPage) return;
      await fetchNextPage();
    })();
  }, [inView]);

  return (
    <>
      {isError ? (
        <Error />
      ) : (
        <>
          <PostList defaultFilter={searchParams.get("filter") as string} handleChange={handleChange} data={data as InfiniteData<PostDataType>} isLoading={isLoading} isFetching={isFetching} />
          <div ref={ref} style={{ display: hasNextPage ? "block" : "none" }} />
        </>
      )}
    </>
  );
};
export default Main;
