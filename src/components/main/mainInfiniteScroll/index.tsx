import { useInfiniteQuery } from "react-query";
import PAGE from "../../../constants/page";
import InfiniteScroll from "react-infinite-scroller";
import PostList from "../_common/postList";
import MainLayout from "../_common/mainLayout";
import fetcher from "../../../utils/fetcher";
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
const MainInfiniteScroll = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery("infinite-posts", ({ pageParam = PAGE.START }) => getPosts(pageParam), {
    // TODO : 이 부분 리턴 걸어야 함.
    staleTime: 0,
    getNextPageParam: (lastPage: any) => {
      let maxCount = Math.ceil(lastPage.pagination.total / PAGE.MAX_PAGE);
      return lastPage.pagination.page < maxCount ? lastPage.pagination.page + 1 : undefined;
    }
  });

  // return <InfiniteScroll loadMore={fetchNextPage}></InfiniteScroll>;
  return (
    <MainLayout>
      <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
        {data?.pages.map((posts: any, index) => {
          return <PostList data={posts.data} key={index} />;
        })}
      </InfiniteScroll>
    </MainLayout>
  );
};
export default MainInfiniteScroll;
