import React from "react";
import { Avatar, Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import moment from "moment";
import { red } from "@mui/material/colors";
import noImage from "../../../../images/noImage.png";
type PostItemProps = {
  item: any;
};

const PostItem = ({ item }: PostItemProps) => {
  const { attributes } = item;
  const writer = item.attributes?.users_permissions_user?.data?.attributes?.username ?? "Stranger";
  return (
    <Grid item xs={20} sm={8} md={4}>
      <Card sx={{ mb: 2 }}>
        <CardHeader avatar={<Avatar sx={{ bgcolor: red[500] }}>{writer.slice(0, 1)}</Avatar>} title={writer} subheader={moment(attributes.createdAt).format("YYYY-MM-DD")} />
        <CardMedia component={"img"} src={attributes.image.data?.attributes.url ?? noImage} height={220} alt={"이미지"} />
        <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100px" }}>
          <div>
            <Typography variant={"h6"} fontWeight={700} color={"text.secondary"}>
              {attributes.name}
            </Typography>
            <Typography variant={"body2"} color={"text.secondary"} whiteSpace={"break-spaces"}>
              {attributes.contents}
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
