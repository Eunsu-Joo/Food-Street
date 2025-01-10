import { Box, Typography } from "@mui/material";
import AddPostForm from "../addPost/addPostForm";
import { UserType } from "../../types/user";
import useUser from "../../hooks/useUser";
import { Navigate, useParams } from "react-router-dom";
import PATH from "../../constants/path";
import { useQuery } from "react-query";
import { PostType } from "../../types/post";
import QUERY_KEYS from "../../constants/querykeys";
import Loading from "../_common/loading";
import { GET_POST } from "../../graphql/posts";
import fetcher from "../../graphql/fetcher";
import Error from "../_common/error";
import EditPostForm from "./editPostForm";

const Edit = () => {
  const { id: postId } = useParams();
  const { data: userData } = useUser();
  const { data, isLoading, isError } = useQuery<any, object, { getPost: PostType }, [string, string]>(
    [QUERY_KEYS.POST, postId as string],
    () => {
      return fetcher(GET_POST, { id: postId });
    },
    {
      staleTime: 0,
      cacheTime: 1000 * 60 * 3,
      enabled: (postId && postId.trim() !== "") as boolean
    }
  );
  if (!userData?.user) return <Navigate to={PATH.LOGIN} />;
  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <Box pb={{ xs: 10 }}>
      <Typography fontWeight={700} component={"h1"} fontSize={{ xs: 22, sm: 28 }} color={"primary"} mb={{ xs: 2, sm: 4 }}>
        Food Street! 수정페이지
      </Typography>
      <EditPostForm user={userData.user as UserType} post={data!.getPost} />
    </Box>
  );
};
export default Edit;
