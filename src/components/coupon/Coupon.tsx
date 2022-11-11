import {
  Avatar,
  Button,
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
import { IMAGE_URL } from "../../constants";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import React, { useState } from "react";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const CustomGrid = styled(Grid)(({ theme }) => ({
  py: 4,
  [theme.breakpoints.down("md")]: {
    py: 0,
  },
}));
const Coupon = () => {
  const [isLike, setIsLike] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <CustomGrid item xs={10} sm={10} md={4}>
      <Card sx={{ mb: 2 }}>
        <CardHeader
          avatar={<Avatar src={IMAGE_URL} aria-label={"recipe"} />}
          title={"Shrimp and Chorizo Paella"}
          subheader="September 14, 2016"
        />
        <CardMedia
          component={"img"}
          src={IMAGE_URL}
          height={192}
          alt={"이미지"}
        />
        <CardContent>
          <Typography variant={"body2"} color={"text.secondary"}>
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardContent sx={{ py: 1 }}>
          <Button
            variant="contained"
            size={"small"}
            startIcon={<VolunteerActivismOutlinedIcon />}
          >
            사용하기
          </Button>
        </CardContent>
        <CardActions disableSpacing={true}>
          <IconButton
            aria-label="add to favorites"
            onClick={() => setIsLike(!isLike)}
          >
            <FavoriteIcon color={isLike ? "action" : "secondary"} />
          </IconButton>
          <IconButton
            aria-label={"share"}
            sx={{ ml: 1 }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <ShareIcon color={"secondary"} />
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
export default Coupon;
