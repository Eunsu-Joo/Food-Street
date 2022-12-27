import PostList from "../_common/postList";
import React, { useState } from "react";
import { Pagination, Stack } from "@mui/material";
import PAGE from "../../../constants/page";
import usePosts from "../../../hooks/usePosts";
import MainLayout from "../_common/mainLayout";

const MainPagination = () => {
  const [currentPage, setCurrentPage] = useState(PAGE.START);
  const { data, isLoading } = usePosts({ currentPage, isPrefetch: false });
  const handlePagination = (event: any, page: number) => {
    setCurrentPage(page);
  };

  return (
    <MainLayout>
      <PostList data={data.data} />
      <Stack direction={"row"} justifyContent={"center"}>
        {!isLoading && <Pagination count={Math.ceil(data.pagination.total / PAGE.MAX_PAGE)} page={currentPage} color="primary" size="small" onChange={handlePagination} />}
      </Stack>
    </MainLayout>
  );
};
export default React.memo(MainPagination);
