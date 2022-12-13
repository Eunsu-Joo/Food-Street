import Layout from "../_common/layout";
import PostList from "../_common/postList";
import { Pagination, Stack } from "@mui/material";
import PAGE from "../../../constants/page";
import React, { useState } from "react";
import Index from "../../_common/loading";
import usePosts from "../../../hooks/usePosts";

const MainPrefetch = () => {
  const [currentPage, setCurrentPage] = useState(PAGE.START);
  const { data, isLoading } = usePosts({ currentPage, isPrefetch: true });

  const handlePagination = (event: any, page: number) => {
    setCurrentPage(page);
  };
  if (isLoading) return <Index />;
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
export default React.memo(MainPrefetch);
