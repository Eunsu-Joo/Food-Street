import PostList from "../_common/postList";
import { useState } from "react";
import { Pagination, Stack } from "@mui/material";
import PAGE from "../../../constants/page";
import usePosts from "../../../hooks/usePosts";
import Loading from "../../_common/Loading";
import Layout from "../_common/Layout";

const MainPagination = () => {
  const [currentPage, setCurrentPage] = useState(PAGE.START);
  const { data, isLoading } = usePosts(currentPage);

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
export default MainPagination;
