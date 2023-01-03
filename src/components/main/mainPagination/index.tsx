import React, { ChangeEvent, useState } from "react";
import PostList from "../../_common/postList";
import usePosts from "../../../hooks/usePosts";
import PAGE from "../../../constants/page";
import MainLayout from "../_common/mainLayout";
import Pagination from "../../_common/pagination";

const MainPagination = () => {
  const [currentPage, setCurrentPage] = useState(PAGE.START);
  const { data } = usePosts({ currentPage, isPrefetch: false });
  return (
    <MainLayout>
      <PostList data={data.data} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} count={data.pagination.total} />
    </MainLayout>
  );
};
export default React.memo(MainPagination);
