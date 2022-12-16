import ModalDefaultProps from "./modal.interface";
import ModalLayout from "./modalLayout";
import useUser from "../../../hooks/useUser";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PATH from "../../../constants/path";

const WelcomeModal = (props: ModalDefaultProps) => {
  const { user } = useUser();
  const navigator = useNavigate();
  if (!user) return <></>;
  return (
    <ModalLayout {...props}>
      <p>{user.user.username}님 방갑습니다!</p>
      <Button onClick={() => navigator(PATH.HOME)}>홈으로</Button>
    </ModalLayout>
  );
};
export default WelcomeModal;
