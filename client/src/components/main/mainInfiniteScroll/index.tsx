import { useInfiniteQuery } from "react-query";
import PAGE from "../../../constants/page";
import InfiniteScroll from "react-infinite-scroller";
import PostList from "../../_common/postList";
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

  return (
    <MainLayout>

    </MainLayout>
  );
};
export default MainInfiniteScroll;
