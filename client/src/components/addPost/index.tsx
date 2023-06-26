import { Typography, Box } from "@mui/material";
import AddPostForm from "./addPostForm";
import useUser from "../../hooks/useUser";
import { Navigate } from "react-router-dom";
import PATH from "../../constants/path";
import { UserType } from "../../types/user";
const AddPost = () => {
  const { data } = useUser();
  if (!data?.user) return <Navigate to={PATH.LOGIN} />;
  return (
    <>
      <Box pb={{ xs: 10 }}>
        <Typography fontWeight={700} component={"h1"} fontSize={{ xs: 22, sm: 28 }} color={"primary"} mb={{ xs: 2, sm: 4 }}>
          Food Street! 맛집을 등록해봅시다.
        </Typography>
        <AddPostForm user={data.user as UserType} />
      </Box>
    </>
  );
};
export default AddPost;
