import ModalLayout from "../_common/modalLayout";
import ModalDefaultProps from "../modal.interface";
import { Button } from "@mui/material";
import useUser from "../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const Index = (props: ModalDefaultProps) => {
  const { clearUser } = useUser();
  const navigator = useNavigate();
  const logout = () => {
    clearUser();
    props.onToggle();
    navigator("/");
  };
  return (
    <ModalLayout {...props}>
      <p>정말 로그아웃 하시겠습니까?</p>
      <Button size={"large"} onClick={logout}>
        Logout
      </Button>
    </ModalLayout>
  );
};
export default Index;
