import React, { useEffect, useState } from "react";
import { Avatar, Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import noImage from "../../../../images/noImage.png";
import { PostType } from "../../../../types/post";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "react-query";
import fetcher from "../../../../graphql/fetcher";
import { LIKE_POST } from "../../../../graphql/posts";
import useModal from "../../../../hooks/useModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserType } from "../../../../types/user";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useUser from "../../../../hooks/useUser";
import DeletePostModal from "../../../modal/deletePostModal";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import QUERY_KEYS from "../../../../constants/querykeys";
dayjs.extend(utc);
dayjs.extend(timezone);
type PostItemProps = {
  item: PostType;
  user: UserType;
};

const PostItem = ({ item, user }: PostItemProps) => {
  const { username, start_time, end_time, address, user_profile, contents, id, likeUsers, image, like, title, createdAt, user_id } = item;
  const [isLike, setIsLike] = useState(likeUsers.includes(user?.jwt));
  const [count, setCount] = useState(like);
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: likePost } = useMutation(
    () => {
      return fetcher(LIKE_POST, { id, isLike: !isLike, jwt: user?.jwt });
    },
    {
      onSuccess: async (data: any) => {
        setCount(data.likePost.count);
        setIsLike(data.likePost.likeUsers.includes(user?.jwt));
        await queryClient.refetchQueries([QUERY_KEYS.POSTS]);
        await queryClient.refetchQueries([QUERY_KEYS.POST, id]);
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

  // useEffect(() => {
  //   setCount(like);
  //   setIsLike(likeUsers.includes(user?.jwt));
  // }, [searchParams.get("filter")]);

  const { isOpen, controller } = useModal();
  const onClickLink = () => navigate(`/post/${id}`);
  return (
    <Grid item xs={20} sm={8} md={4}>
      <Card onClick={onClickLink} sx={{ cursor: "pointer", mb: 2 }}>
        <CardHeader
          avatar={
            <Avatar src={user_profile ?? undefined} sx={{ bgcolor: red[500] }}>
              {username.slice(0, 1)}
            </Avatar>
          }
          title={username}
          subheader={dayjs.utc(createdAt).tz("Asia/Seoul").format("YYYY년 MM월DD일 HH시mm분")}
          action={
            user && user.jwt === user_id ? (
              <IconButton
                sx={{ ml: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  controller();
                }}
              >
                <DeleteIcon />
              </IconButton>
            ) : undefined
          }
        />
        <CardMedia component={"img"} src={image ?? noImage} height={220} alt={"이미지"} />
        <CardContent sx={{ height: "auto", minHeight: "130px" }}>
          {start_time && end_time && (
            <Typography component={"p"}>
              🕒{start_time} - {end_time}
            </Typography>
          )}
          {address && <Typography component={"p"}>📍{address}</Typography>}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant={"h6"} fontWeight={700} color={"text.secondary"}>
              {title}
            </Typography>
            <div>
              <IconButton disabled={!user} onClick={onClickFavorite}>
                {isLike ? <FavoriteIcon color={"error"} /> : <FavoriteBorderIcon />}
              </IconButton>
              <Typography component={"span"}>{count}</Typography>
            </div>
          </div>
          <div>
            <Typography variant={"body1"} color={"text.secondary"}>
              {contents}
            </Typography>
          </div>
        </CardContent>
      </Card>
      {isOpen && <DeletePostModal onToggle={controller} isOpen={isOpen} id={id} />}
    </Grid>
  );
};
export default PostItem;
