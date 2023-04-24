import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useModal from "../../../../hooks/useModal";
import Index from "../../modal/logoutModal";
import PATH from "../../../../constants/path";
import { Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import type { UserType } from "../../../../types/user";

const UserToggle = ({ user }: { user: UserType }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const navigator = useNavigate();
  const { isOpen, controller } = useModal();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleProfile = () => {
    handleClose();
    navigator(PATH.PROFILE);
  };
  const handleList = () => {
    handleClose();
    navigator(PATH.MY_LIST);
  };
  const handleChangePw = () => {
    handleClose();
    navigator(PATH.CHANGE_PW);
  };

  const handleLogout = () => {
    handleClose();
    controller();
  };

  return (
    <div>
      <Button sx={{ color: "#fff", fontSize: 18 }} id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: green[500],
            fontWeight: 600,
            mx: 1
          }}
          src={user.user.profile_image?.url ?? undefined}
        />
        <Typography sx={{ display: { xs: "none", sm: "inline" } }}>{user.user.username}</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        {/*<MenuItem onClick={handleList}>내가 쓴 글✨</MenuItem>*/}
        <MenuItem onClick={handleProfile}>프로필💕</MenuItem>
        <MenuItem onClick={handleChangePw}>비밀번호 변경🤡</MenuItem>
        <MenuItem onClick={handleLogout}>로그아웃💨</MenuItem>
      </Menu>
      {isOpen && <Index onToggle={controller} isOpen={isOpen} />}
    </div>
  );
};
export default UserToggle;
