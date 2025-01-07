import { Button, CardActions, IconButton, Stack, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import fetcher from "../../graphql/fetcher";
import { LIKE_POST } from "../../graphql/posts";
import QUERY_KEYS from "../../constants/querykeys";
import { UserType } from "../../types/user";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
type LikeButtonProps = {
  user: UserType;
  like: number;
  likeUsers: string[];
  id: number;
};
const LikeButton = ({ like, likeUsers, user, id }: LikeButtonProps) => {
  const [isLike, setIsLike] = useState(likeUsers.includes(user?.jwt) ?? false);
  const [count, setCount] = useState(like);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: likePost } = useMutation(
    () => {
      return fetcher(LIKE_POST, { id, isLike: !isLike, jwt: user?.jwt });
    },
    {
      onSuccess: async (data: any) => {
        setCount(data.likePost.count);
        setIsLike(data.likePost.likeUsers.includes(user?.jwt));
        await queryClient.invalidateQueries([QUERY_KEYS.POSTS], {
          exact: false
        });
      },
      onError: (error: any) => {
        const message = error.response?.errors[0].message ?? "알수없는 애러가 발생했습니다.";
        alert(message);
      }
    }
  );
  const onClickFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLike((prev) => !prev);
    likePost();
  };
  return (
    <CardActions sx={{ marginTop: "auto", width: "inherit", justifyContent: "space-between" }}>
      <Stack alignItems={"center"} flexDirection={"row"}>
        <IconButton disabled={!user} onClick={onClickFavorite}>
          {isLike ? <FavoriteIcon color={"error"} /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography component={"span"} pl={1}>
          {count}
        </Typography>
      </Stack>
      <Button onClick={() => navigate(`/edit/${id}`)} variant="contained" startIcon={<EditIcon />} sx={{ marginLeft: "auto" }}>
        수정하기
      </Button>
    </CardActions>
  );
};
export default LikeButton;
