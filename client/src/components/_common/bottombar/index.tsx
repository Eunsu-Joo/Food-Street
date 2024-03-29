import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import useModal from "../../../hooks/useModal";
import Index from "../../modal/LogoutModal";
import PATH from "../../../constants/path";
import useUser from "../../../hooks/useUser";

const BottomBar = () => {
  const navigate = useNavigate();
  const { isOpen, controller } = useModal();
  const { data } = useUser();
  return (
    <Paper sx={{ display: { sx: "block", md: "none" }, position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels>
        {data?.user ? <BottomNavigationAction label={"Logout"} onClick={controller} icon={<LogoutIcon />} /> : <BottomNavigationAction label={"Login"} onClick={() => navigate(PATH.LOGIN)} icon={<AccountCircleIcon />} />}
        <BottomNavigationAction label={"Home"} onClick={() => navigate("/")} icon={<HomeIcon />} />
        <BottomNavigationAction label={"Add Post"} onClick={() => navigate(PATH.ADD_POST)} icon={<ControlPointIcon />} />
      </BottomNavigation>
      {isOpen && <Index onToggle={controller} isOpen={isOpen} />}
    </Paper>
  );
};
export default BottomBar;
