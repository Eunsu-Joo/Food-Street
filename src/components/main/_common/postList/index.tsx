import { Grid, styled } from "@mui/material";
import PostItem from "./postItem";

type PostListProps = {
  data: Array<any>;
};

const CustomGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    border: "1px solid black",
    justifyContent: "center",
  },
}));

const PostList = ({ data }: PostListProps) => {
  return (
    <CustomGrid container={true} sx={{ py: 4 }} spacing={2}>
      {data.map((item: any, index: number) => (
        <PostItem key={index} item={item} />
      ))}
    </CustomGrid>
  );
};
export default PostList;
// suspense
