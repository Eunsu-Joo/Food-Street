import Box from "@mui/material/Box";
import Index from "./postItem";
import { Grid, styled } from "@mui/material";
import httpModules from "../../httpModules/instance";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import PostItem from "./postItem";
const CustomGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    border: "1px solid black",
    justifyContent: "center",
  },
}));
const PostList = () => {
  const { isError, isLoading, data, error } = useQuery(
    ["posts"],
    httpModules.getPosts,
    {
      cacheTime: 60 * 1 * 1000,
      staleTime: 0,
    }
  );
  if (isLoading) return <p>Loading</p>;
  return (
    <CustomGrid container spacing={2} sx={{ py: 4 }}>
      {data.data.posts.map((item: any, index: number) => (
        <PostItem key={index} item={item} />
      ))}
    </CustomGrid>
  );
};
export default PostList;
