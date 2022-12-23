import { ReactNode } from "react";
import ModalLayout from "./modalLayout";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PATH from "../../../constants/path";
import type ModalDefaultProps from "./modal.interface";

const TextModal = (props: ModalDefaultProps & { children: ReactNode }) => {
  const navigator = useNavigate();
  const { children, ...rest } = props;
  return (
    <ModalLayout {...rest}>
      {children}
      <Button onClick={() => navigator(PATH.HOME)}>홈으로</Button>
    </ModalLayout>
  );
};
export default TextModal;
