import ModalLayout from "./_common/modalLayout";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import PATH from "../../../constants/path";
import type ModalDefaultProps from "./modal.interface";

const Modal = (props: ModalDefaultProps & { message: string }) => {
  const navigator = useNavigate();
  const { message, ...rest } = props;
  return (
    <ModalLayout {...rest}>
      <Typography>{message}</Typography>
      <Button fullWidth={true} sx={{ mt: 2 }} onClick={() => navigator(PATH.HOME)}>
        홈으로
      </Button>
    </ModalLayout>
  );
};
export default Modal;
