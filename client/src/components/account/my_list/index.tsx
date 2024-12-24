import { Navigate, useSearchParams } from "react-router-dom";
import PATH from "../../../constants/path";
import useUser from "../../../hooks/useUser";
import { ChangeEvent, useEffect, useRef } from "react";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { InfiniteData, useInfiniteQuery, useQueryClient } from "react-query";
import QUERY_KEYS from "../../../constants/querykeys";
import fetcher from "../../../graphql/fetcher";
import { GET_POSTS } from "../../../graphql/posts";
import { PostDataType } from "../../../types/post";
import Error from "../../_common/error";
import Loading from "../../_common/loading";
import PostList from "../../_common/postList";

const MyList = () => {
  const { data: userData } = useUser();

  const [searchParams, setSearchParams] = useSearchParams({ filter: "latest" });
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ filter: event.target.value as string });
  };
  const queryClient = useQueryClient();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInfiniteScroll({ ref });
  const { data, isLoading, isFetchingNextPage, isFetching, isError, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [QUERY_KEYS.MY_LIST, searchParams.get("filter")],
    ({ pageParam = 1 }) => {
      return fetcher(GET_POSTS, { pageParam, username: userData?.user.email, filter: searchParams.get("filter") });
    },
    {
      getNextPageParam: (_lastPage: PostDataType, pages) => {
        if (pages.length + 1 > _lastPage.getPosts.pageCount) return;
        return pages.length + 1;
      },
      staleTime: 0,
      cacheTime: 1000 * 60 * 3
      // 기존 캐싱되어 있는 데이터는 캐싱되어있는 데이터로 가져다 쓰기
      // enabled: !queryClient.getQueryData([QUERY_KEYS.MY_LIST, searchParams.get("filter")])
    }
  );
  useEffect(() => {
    (async () => {
      if (!hasNextPage || !inView || isFetchingNextPage || isFetching || isLoading) return;
      await fetchNextPage();
    })();
  }, [inView]);
  if (isError) return <Error />;
  if (!userData?.user) return <Navigate to={PATH.LOGIN} />;
  return (
    <>
      {isFetching && !isLoading && !hasNextPage && <Loading />}
      <PostList defaultFilter={searchParams.get("filter") as string} handleChange={handleChange} data={data as InfiniteData<PostDataType>} isFetching={isFetchingNextPage} />
      <div ref={ref} style={{ display: !isError || !userData?.user ? "block" : "none" }} />
    </>
  );
};
export default MyList;
