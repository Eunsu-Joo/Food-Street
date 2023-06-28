import React from "react";
import { Avatar, Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import moment from "moment";
import { red } from "@mui/material/colors";
import noImage from "../../../../images/noImage.png";
import { PostsType, PostType } from "../../../../types/post";
type PostItemProps = {
  item: PostType;
};

const PostItem = ({ item }: PostItemProps) => {
  const { username, user_profile, id, image, name, contents, createdAt } = item;
  return (
    <Grid item xs={20} sm={8} md={4}>
      <Card sx={{ mb: 2 }}>
        <CardHeader avatar={<Avatar sx={{ bgcolor: red[500] }}>{username.slice(0, 1)}</Avatar>} title={username} subheader={""} />
        <CardMedia component={"img"} src={image ?? noImage} height={220} alt={"이미지"} />
        <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100px" }}>
          <div>
            <Typography variant={"h6"} fontWeight={700} color={"text.secondary"}>
              {name}
            </Typography>
            <Typography variant={"body2"} color={"text.secondary"} whiteSpace={"break-spaces"}>
              {contents}
            </Typography>
          </div>
          <IconButton sx={{ ml: 1 }}>
            <ShareIcon color={"action"} />
          </IconButton>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default PostItem;
