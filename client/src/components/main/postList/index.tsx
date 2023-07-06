import { Box, Grid, InputLabel, NativeSelect, Typography } from "@mui/material";
import PostItem from "./postItem";
import NoResult from "./noResult";
import { PostDataType, PostsType } from "../../../types/post";
import useUser from "../../../hooks/useUser";
import FormControl from "@mui/material/FormControl";
import { ChangeEvent, useState } from "react";
import { InfiniteData } from "react-query";

type PostListProps = {
  data: InfiniteData<PostDataType>;
  isLoading: boolean;
  isFetching: boolean;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  defaultFilter: string;
};

const PostList = ({ data, isLoading, isFetching, handleChange, defaultFilter }: PostListProps) => {
  const { data: user } = useUser();

  if (data?.pages.length === 0) return <NoResult />;

  return (
    <>
      {(isLoading || isFetching) && (
        <Typography letterSpacing={3} my={2} fontSize={24} fontFamily={"Montserrat"} fontWeight={600} align={"center"} textTransform={"uppercase"}>
          fetching...
        </Typography>
      )}
      {/*{!isLoading && !isFetching && (*/}
      {/*  <Box width={{ sx: "100%", md: 300 }} sx={{ marginLeft: "auto" }}>*/}
      {/*    <FormControl fullWidth={true}>*/}
      {/*      <InputLabel variant="standard" htmlFor="uncontrolled-native">*/}
      {/*        Filter*/}
      {/*      </InputLabel>*/}
      {/*      <NativeSelect onChange={handleChange} defaultValue={defaultFilter} sx={{ paddingLeft: "8px" }}>*/}
      {/*        <option value={"latest"}>최신순</option>*/}
      {/*        <option value={"popular"}>인기순</option>*/}
      {/*        <option value={"order"}>가나다순</option>*/}
      {/*      </NativeSelect>*/}
      {/*    </FormControl>*/}
      {/*  </Box>*/}
      {/*)}*/}
      {data?.pages.map((data: PostDataType, index) => {
        return (
          <Grid key={index} container={true} justifyContent={{ xs: "center", md: "flex-start" }} my={{ xs: 2, sm: 4 }} spacing={2}>
            {data.getPosts!.data.map((item, i) => {
              return <PostItem item={item} user={user?.user} key={i} />;
            })}
          </Grid>
        );
      })}
    </>
  );
};
export default PostList;
