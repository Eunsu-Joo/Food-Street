import { Grid, styled } from "@mui/material";
import PostItem from "./postItem";

type PostListProps = {
  data: Array<any>;
};

const PostList = ({ data }: PostListProps) => {
  return (
    <Grid container={true} justifyContent={{ xs: "center", md: "flex-start" }} my={{ xs: 2, sm: 4 }} spacing={2}>
      {data.map((item: any, index: number) => (
        <PostItem key={index} item={item} />
      ))}
    </Grid>
  );
};
export default PostList;
// suspense
