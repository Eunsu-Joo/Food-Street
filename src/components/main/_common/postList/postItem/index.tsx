import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

type PostItemProps = {
  item: any;
};
const CustomGrid = styled(Grid)(({ theme }) => ({
  py: 4,
  [theme.breakpoints.down("md")]: {
    py: 0,
  },
}));
const PostItem = ({ item }: PostItemProps) => {
  const [isLike, setIsLike] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { attributes } = item;

  return (
    <CustomGrid item xs={10} sm={10} md={4}>
      <Card sx={{ mb: 2 }}>
        <CardHeader
          avatar={
            <Avatar
              src={attributes.image.data?.attributes.url}
              aria-label={"recipe"}
            />
          }
          title={attributes.name}
          subheader={attributes.createdAt}
        />
        <CardMedia
          component={"img"}
          src={attributes.image.data?.attributes.url}
          height={192}
          alt={"이미지"}
        />
        <CardContent>
          <Typography variant={"body2"} color={"text.secondary"}>
            {attributes.contents}
          </Typography>
        </CardContent>
        <CardActions disableSpacing={true}>
          <IconButton
            aria-label="add to favorites"
            onClick={() => setIsLike(!isLike)}
          >
            <FavoriteIcon color={isLike ? "error" : "action"} />
          </IconButton>
          <IconButton
            aria-label={"share"}
            sx={{ ml: 1 }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <ShareIcon color={"action"} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>KAKAO</MenuItem>
            <MenuItem onClick={handleClose}>LINK</MenuItem>
          </Menu>
        </CardActions>
      </Card>
    </CustomGrid>
  );
};
export default PostItem;
