import Layout from "../_common/Layout";
import PostList from "../_common/postList";
import { Pagination, Stack } from "@mui/material";
import PAGE from "../../../constants/page";
import { useState } from "react";
import Loading from "../../_common/Loading";
import usePrefetchPosts from "../../../hooks/usePrefetchPosts";

const MainPrefetch = () => {
  const [currentPage, setCurrentPage] = useState(PAGE.START);
  const { data, isLoading } = usePrefetchPosts(currentPage);

  const handlePagination = (event: any, page: number) => {
    setCurrentPage(page);
  };
  if (isLoading) return <Loading />;
  return (
    <Layout>
      <PostList data={data.data} />
      <Stack direction={"row"} justifyContent={"center"}>
        <Pagination
          count={Math.ceil(data.pagination.total / PAGE.MAX_PAGE)}
          page={currentPage}
          color="primary"
          size="small"
          onChange={handlePagination}
        />
      </Stack>
    </Layout>
  );
};
export default MainPrefetch;
