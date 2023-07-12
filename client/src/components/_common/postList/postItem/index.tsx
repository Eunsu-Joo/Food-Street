import React, { useEffect, useState } from "react";
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import noImage from "../../../../images/noImage.png";
import { PostsType, PostType } from "../../../../types/post";
import dayjs from "dayjs";
import { useMutation } from "react-query";
import fetcher from "../../../../graphql/fetcher";
import { LIKE_POST } from "../../../../graphql/posts";
import Modal from "../../../modal";
import useModal from "../../../../hooks/useModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserType } from "../../../../types/user";
import { useSearchParams } from "react-router-dom";
import useUser from "../../../../hooks/useUser";
import DeletePostModal from "../../../modal/deletePostModal";
type PostItemProps = {
  item: PostType;
  user: UserType;
};

const PostItem = ({ item, user }: PostItemProps) => {
  const { username, user_profile, id, likeUsers, image, like, name, createdAt } = item;
  const [isLike, setIsLike] = useState(likeUsers.includes(user?.jwt));
  const [count, setCount] = useState(like);
  const [searchParams, _] = useSearchParams();

  const { data } = useUser();
  const { mutate: likePost } = useMutation(
    () => {
      return fetcher(LIKE_POST, { id, isLike: !isLike, jwt: user?.jwt });
    },
    {
      onSuccess: (data: any) => {
        setCount(data.likePost.count);
      },
      onError: (error: any) => {
        const message = error.response?.errors[0].message ?? "알수없는 애러가 발생했습니다.";
        alert(message);
      }
    }
  );

  const onClickFavorite = () => {
    setIsLike((prev) => !prev);
    likePost();
  };
  useEffect(() => {
    setCount(like);
    setIsLike(likeUsers.includes(user?.jwt));
  }, [searchParams.get("filter")]);
  const { isOpen, controller } = useModal();
  return (
    <Grid item xs={20} sm={8} md={4}>
      <Card sx={{ mb: 2 }}>
        <CardHeader
          avatar={
            <Avatar src={user_profile ?? undefined} sx={{ bgcolor: red[500] }}>
              {username.slice(0, 1)}
            </Avatar>
          }
          title={username}
          subheader={dayjs(createdAt).format("YYYY년 MM월DD일 HH시MM분")}
          action={
            data?.user && data?.user.username === username ? (
              <IconButton sx={{ ml: 1 }} onClick={controller}>
                <DeleteIcon />
              </IconButton>
            ) : undefined
          }
        />
        <CardMedia component={"img"} src={image ?? noImage} height={220} alt={"이미지"} />
        <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100px" }}>
          <div>
            <Typography variant={"h6"} fontWeight={700} color={"text.secondary"}>
              {name}
            </Typography>
          </div>
          <div>
            <IconButton disabled={!user} onClick={onClickFavorite}>
              {isLike ? <FavoriteIcon color={"error"} /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography component={"span"}>{count}</Typography>
          </div>
        </CardContent>
      </Card>
      {isOpen && <DeletePostModal onToggle={controller} isOpen={isOpen} id={id} />}
    </Grid>
  );
};
export default PostItem;
