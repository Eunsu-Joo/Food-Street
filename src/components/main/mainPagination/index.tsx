import React, { ChangeEvent, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import PostList from "../_common/postList";
import usePosts from "../../../hooks/usePosts";
import PAGE from "../../../constants/page";
import MainLayout from "../_common/mainLayout";

const MainPagination = () => {
  const [currentPage, setCurrentPage] = useState(PAGE.START);
  const { data, isLoading } = usePosts({ currentPage, isPrefetch: false });

  const handlePagination = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      {!isLoading && (
        <MainLayout>
          <PostList data={data.data} />
          <Stack direction={"row"} justifyContent={"center"}>
            {data.data.length > 0 && <Pagination count={Math.ceil(data.pagination.total / PAGE.MAX_PAGE)} page={currentPage} color="primary" size="small" onChange={handlePagination} />}
          </Stack>
        </MainLayout>
      )}
    </>
  );
};
export default React.memo(MainPagination);
