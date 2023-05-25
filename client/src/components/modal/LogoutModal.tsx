import ModalLayout from "./_common/ModalLayout";
import ModalDefaultProps from "./modal.interface";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import QUERY_KEYS from "../../constants/querykeys";
import SESSION_KEYS from "../../constants/sessionKeys";
import { clearSessionUser } from "../../utils/storage";

const LogoutModal = (props: ModalDefaultProps) => {
  const navigator = useNavigate();
  const queryClient = useQueryClient();
  const logout = () => {
    queryClient.removeQueries([QUERY_KEYS.USER]);
    clearSessionUser();
    props.onToggle();
    navigator("/");
  };
  return (
    <ModalLayout {...props}>
      <Typography component={"p"} fontWeight={600} fontSize={20} marginBottom={1.5}>
        정말 로그아웃 하시겠습니까?
      </Typography>
      <Button size={"large"} onClick={logout}>
        Logout
      </Button>
    </ModalLayout>
  );
};
export default LogoutModal;
