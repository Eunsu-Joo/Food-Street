import { InfiniteData, useMutation, useQuery, useQueryClient } from "react-query";
import QUERY_KEYS from "../../constants/querykeys";
import { useParams } from "react-router-dom";
import fetcher from "../../graphql/fetcher";
import { GET_POST, LIKE_POST } from "../../graphql/posts";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import noImage from "../../images/noImage.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useState } from "react";
import Loading from "../_common/loading";
import NotFound from "../_common/notFound";
import { PostType } from "../../types/post";
import useUser from "../../hooks/useUser";
import useModal from "../../hooks/useModal";
import DeletePostModal from "../modal/deletePostModal";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import LikeButton from "./LikeButton";
const Post = () => {
  const { id: postId } = useParams();
  const { data: userData } = useUser();
  const { isOpen, controller } = useModal();
  const { data, isLoading } = useQuery<any, object, { getPost: PostType }, [string, string]>(
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
  if (isLoading) return <Loading />;
  if (!data) return <NotFound />;

  const { username, start_time, end_time, address, user_profile, contents, id, likeUsers, image, like, title, createdAt, user_id } = data.getPost;

  return (
    <>
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <Grid container sx={{ flexGrow: 1, alignItems: "stretch", justifyContent: "center" }}>
          <Grid item xs={10} sm={4} md={4} height={"inherit"}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardHeader
                avatar={
                  <Avatar src={user_profile ?? undefined} sx={{ bgcolor: red[500] }}>
                    {username.slice(0, 1)}
                  </Avatar>
                }
                title={username}
                subheader={dayjs.utc(createdAt).tz("Asia/Seoul").format("YYYY년 MM월DD일 HH시mm분")}
                action={
                  userData.user && userData.user.jwt === user_id ? (
                    <>
                      <IconButton
                        sx={{ ml: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          controller();
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  ) : undefined
                }
              />
              <CardContent sx={{ height: "auto", minHeight: "130px" }}>
                {start_time && end_time && (
                  <Typography component={"p"} pb={1}>
                    🕒{start_time} - {end_time}
                  </Typography>
                )}
                {address && <Typography component={"p"}>📍{address}</Typography>}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Typography variant={"body1"} fontWeight={700} pb={2} color={"text.secondary"} sx={{ wordBreak: "break-all" }}>
                    {title}
                  </Typography>
                </div>
                <div>
                  <Typography variant={"body1"} color={"text.secondary"} sx={{ wordBreak: "break-all" }}>
                    {contents}
                  </Typography>
                </div>
              </CardContent>
              <LikeButton like={like} likeUsers={likeUsers} user={userData.user} id={id} />
            </Card>
          </Grid>
          <Grid item xs={10} sm={8} md={8} borderRadius={2}>
            <img style={{ width: "100%", height: "100%", overflow: "hidden" }} src={image ?? noImage} alt="" />
          </Grid>
        </Grid>
      </Container>
      {isOpen && <DeletePostModal onToggle={controller} isOpen={isOpen} id={id} />}
    </>
  );
};
export default Post;
