import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { InfiniteData, useInfiniteQuery, useQueryClient } from "react-query";
import QUERY_KEYS from "../../constants/querykeys";
import fetcher from "../../graphql/fetcher";
import { GET_POSTS } from "../../graphql/posts";
import { PostDataType } from "../../types/post";
import PostList from "../_common/postList";
import Error from "../_common/error";
import { useSearchParams } from "react-router-dom";
import Loading from "../_common/loading";

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams({ filter: "latest" });
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ filter: event.target.value as string });
  };
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInfiniteScroll({ ref });
  const { data, isLoading, isFetchingNextPage, isFetching, isError, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [QUERY_KEYS.POSTS, searchParams.get("filter")],
    ({ pageParam = 1 }) => {
      return fetcher(GET_POSTS, { pageParam, filter: searchParams.get("filter") });
    },
    {
      getNextPageParam: (_lastPage: PostDataType, pages) => {
        if (pages.length + 1 > _lastPage.getPosts.pageCount) return;
        return pages.length + 1;
      },
      staleTime: 0,
      cacheTime: 1000 * 60 * 3
      // 기존 캐싱되어 있는 데이터는 캐싱되어있는 데이터로 가져다 쓰기
      //  연결되 있는 모든것들을 업데이트를 일일이 하나씩 다 해줘야함. 우선 주석처리.
      // enabled: !queryClient.getQueryData([QUERY_KEYS.POSTS, searchParams.get("filter")])
      // enabled: true
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
      {isLoading && <Loading />}
      <PostList defaultFilter={searchParams.get("filter") as string} handleChange={handleChange} data={data as InfiniteData<PostDataType>} isFetching={isFetchingNextPage} />
      <div ref={ref} style={{ display: !isError ? "block" : "none" }} />
    </>
  );
};
export default Main;
