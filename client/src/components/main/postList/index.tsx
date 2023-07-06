import { Box, Grid, InputLabel, NativeSelect, styled } from "@mui/material";
import PostItem from "./postItem";
import NoResult from "./noResult";
import { PostDataType, PostsType } from "../../../types/post";
import FormControl from "@mui/material/FormControl";
import useUser from "../../../hooks/useUser";

type PostListProps = {
  data: PostDataType;
};

const PostList = ({ data }: PostListProps) => {
  const { data: user } = useUser();

  if (data.getPosts.data.length === 0) return <NoResult />;
  return (
    <>
      <Grid container={true} justifyContent={{ xs: "center", md: "flex-start" }} my={{ xs: 2, sm: 4 }} spacing={2}>
        {data.getPosts!.data.map((item, index) => {
          return <PostItem item={item} user={user?.user} key={index} />;
        })}
      </Grid>
    </>
  );
};
export default PostList;
