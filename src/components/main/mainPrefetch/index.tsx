import React, { useState } from "react";
import Pagination from "../../_common/pagination";
import PostList from "../../_common/postList";
import usePosts from "../../../hooks/usePosts";
import PAGE from "../../../constants/page";
import MainLayout from "../_common/mainLayout";

const MainPrefetch = () => {
  const [currentPage, setCurrentPage] = useState(PAGE.START);
  const { data } = usePosts({ currentPage, isPrefetch: true });
  return (
    <MainLayout>
      <PostList data={data.data} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} count={data.pagination.total} />
    </MainLayout>
  );
};
export default React.memo(MainPrefetch);
