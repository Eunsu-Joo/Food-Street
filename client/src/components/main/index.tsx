import MainLayout from "../_common/mainLayout";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import QUERY_KEYS from "../../constants/querykeys";
import fetcher from "../../graphql/fetcher";
import { GET_POSTS } from "../../graphql/posts";
import { PostDataType } from "../../types/post";
import { Box, InputLabel, NativeSelect, Typography } from "@mui/material";
import PostList from "./postList";
import FormControl from "@mui/material/FormControl";

const Main = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInfiniteScroll({ ref });
  const { data, isLoading, isFetchingNextPage, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [QUERY_KEYS.POSTS],
    ({ pageParam = 1 }) => {
      return fetcher(GET_POSTS, { pageParam });
    },
    {
      getNextPageParam: (_lastPage: PostDataType, pages) => {
        if (pages.length + 1 > _lastPage.getPosts.pageCount) return;
        return pages.length + 1;
      },
      staleTime: 0,
      cacheTime: 1000 * 60 * 3
    }
  );
  const [filter, setFilter] = useState("latest");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value as string);
  };

  useEffect(() => {
    (async () => {
      if (!hasNextPage || !inView || isFetchingNextPage) return;
      await fetchNextPage();
    })();
  }, [inView]);

  return (
    <>
      {(isLoading || isFetching) && (
        <Typography letterSpacing={3} my={2} fontSize={24} fontFamily={"Montserrat"} fontWeight={600} align={"center"} textTransform={"uppercase"}>
          fetching...
        </Typography>
      )}
      {!isLoading && !isFetching && (
        <Box width={{ sx: "100%", md: 300 }} sx={{ marginLeft: "auto" }}>
          <FormControl fullWidth={true}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Filter
            </InputLabel>
            <NativeSelect defaultValue={"latest"} sx={{ paddingLeft: "8px" }}>
              <option value={"latest"}>최신순</option>
              <option value={"popular"}>인기순</option>
              <option value={"order"}>가나다순</option>
            </NativeSelect>
          </FormControl>
        </Box>
      )}
      {data?.pages.map((data: PostDataType, index) => {
        return <PostList data={data} key={index} />;
      })}
      <div ref={ref} style={{ display: hasNextPage ? "block" : "none" }} />
    </>
  );
};
export default Main;
