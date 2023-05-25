import ModalLayout from "./_common/ModalLayout";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import PATH from "../../constants/path";
import type ModalDefaultProps from "./modal.interface";

const Modal = (props: ModalDefaultProps & { message: string; home?: boolean }) => {
  const navigator = useNavigate();
  const { message, home = true, ...rest } = props;
  return (
    <ModalLayout {...rest}>
      <Typography>{message}</Typography>
      {home && (
        <Button fullWidth={true} sx={{ mt: 2 }} onClick={() => navigator(PATH.HOME)}>
          홈으로
        </Button>
      )}
    </ModalLayout>
  );
};
export default Modal;
