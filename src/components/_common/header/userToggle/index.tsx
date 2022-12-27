import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useModal from "../../../../hooks/useModal";
import PATH from "../../../../constants/path";
import { Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import LogoutModal from "../../modal/logoutModal";
import { UserType } from "../../../../types/user";

type UserToggleProps = {
  user: UserType;
};

const UserToggle = ({ user }: UserToggleProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const navigator = useNavigate();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { isOpen, controller } = useModal();
  const handleClose = () => setAnchorEl(null);
  const handleProfile = () => {
    handleClose();
    navigator(PATH.PROFILE);
  };
  const handleChangePw = () => {
    handleClose();
    navigator(PATH.RESET_PW);
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
          src={user.user.profile_image ?? undefined}
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
        <MenuItem onClick={handleProfile}>프로필💕</MenuItem>
        <MenuItem onClick={handleChangePw}>비밀번호 변경🤡</MenuItem>
        <MenuItem onClick={handleLogout}>로그아웃💨</MenuItem>
      </Menu>
      {isOpen && <LogoutModal onToggle={controller} isOpen={isOpen} />}
    </div>
  );
};
export default UserToggle;
