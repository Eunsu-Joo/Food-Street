import { Stack, Pagination as MUIPagination } from "@mui/material";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import PAGE from "../../../constants/page";

type PaginationProps = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  count: number | undefined;
};

const Pagination = ({ currentPage, setCurrentPage, count }: PaginationProps) => {
  const handlePagination = (event: ChangeEvent<unknown>, page: number) => {
    if (currentPage !== page) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };
  const pageCount = count ? Math.ceil(count / PAGE.MAX_PAGE) : null;
  if (!pageCount) return <></>;
  return (
    <Stack direction={"row"} justifyContent={"center"}>
      <MUIPagination count={pageCount} page={currentPage} color="primary" size="small" onChange={handlePagination} />
    </Stack>
  );
};
export default Pagination;
