import React, { useState } from "react";
import PostList from "../_common/postList";
import { Pagination, Stack } from "@mui/material";
import usePosts from "../../../hooks/usePosts";
import PAGE from "../../../constants/page";
import MainLayout from "../_common/mainLayout";
import type { MouseEvent } from "react";

const MainPrefetch = () => {
  const [currentPage, setCurrentPage] = useState(PAGE.START);
  const { data, isLoading } = usePosts({ currentPage, isPrefetch: true });

  const handlePagination = (event: MouseEvent<HTMLButtonElement>, page: number) => {
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
export default React.memo(MainPrefetch);
