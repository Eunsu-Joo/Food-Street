import MainLayout from "../_common/mainLayout";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import QUERY_KEYS from "../../constants/querykeys";
import fetcher from "../../graphql/fetcher";
import { GET_POSTS } from "../../graphql/posts";
import PAGE from "../../constants/page";
import { PostDataType } from "../../types/post";
import { Typography } from "@mui/material";
import PostList from "./postList";

const Main = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInfiniteScroll({ ref });
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [QUERY_KEYS.POSTS],
    ({ pageParam = 1 }) => {
      return fetcher(GET_POSTS, { pageParam });
    },
    {
      getNextPageParam: (_lastPage: PostDataType, pages) => {
        if (_lastPage.getPosts.length < PAGE.LIMIT) return;
        return pages.length + 1;
      },
      staleTime: 0,
      cacheTime: 1000 * 60 * 3
    }
  );
  useEffect(() => {
    (async () => {
      if (!hasNextPage || !inView) return;
      await fetchNextPage();
    })();
  }, [inView]);

  return (
    <MainLayout>
      {(isLoading || isFetching) && (
        <Typography letterSpacing={3} my={2} fontSize={24} fontFamily={"Montserrat"} fontWeight={600} align={"center"} textTransform={"uppercase"}>
          fetching...
        </Typography>
      )}
      {data?.pages.map((data: PostDataType, index) => {
        return <PostList data={data} key={index} />;
      })}
      <div ref={ref} />
    </MainLayout>
  );
};
export default Main;
