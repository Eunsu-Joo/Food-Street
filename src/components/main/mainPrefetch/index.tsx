import React, { ChangeEvent, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import PostList from "../_common/postList";
import usePosts from "../../../hooks/usePosts";
import PAGE from "../../../constants/page";
import MainLayout from "../_common/mainLayout";

const MainPrefetch = () => {
  const [currentPage, setCurrentPage] = useState(PAGE.START);
  const { data, isLoading } = usePosts({ currentPage, isPrefetch: true });

  const handlePagination = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <MainLayout>
      <PostList data={data.data} />
      {!isLoading && data.data.length > 0 && (
        <Stack direction={"row"} justifyContent={"center"}>
          <Pagination count={Math.ceil(data.pagination.total / PAGE.MAX_PAGE)} page={currentPage} color="primary" size="small" onChange={handlePagination} />
        </Stack>
      )}
    </MainLayout>
  );
};
export default React.memo(MainPrefetch);
