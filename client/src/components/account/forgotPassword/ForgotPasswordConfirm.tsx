import emailjs from "@emailjs/browser";
import React, { useRef, useState } from "react";
import { FormType } from "./index";
import { Button, Typography } from "@mui/material";
import Modal from "../../modal";
import useModal from "../../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import PATH from "../../../constants/path";
const ForgotPasswordConfirm = ({ forms }: { forms: FormType }) => {
  const { password, email } = forms;
  const hidePw = `${password.slice(0, password.length - 4)}****`;
  const { isOpen, controller } = useModal();
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const sendEmail = () => {
    emailjs
      .send(
        "service_uob825s",
        "template_uukh5dm",
        {
          message: password,
          to_email: email
        },
        "M6RbrvYuDKcrIolyh"
      )
      .then(
        (result) => {
          if (result.status === 200) {
            setMessage("이메일을 성공적으로 보냈습니다. ");
            controller();
            setIsSuccess(true);
          }
        },
        (error) => {
          setMessage(error.text);
          controller();
        }
      );
  };
  const goLogin = () => {
    controller();
    navigate(PATH.LOGIN);
  };
  return (
    <>
      <Typography align={"center"} my={4} fontSize={22}>
        유저의 비밀번호는 {hidePw} 입니다.
      </Typography>
      <Button onClick={sendEmail} variant={"contained"} fullWidth={true} size={"large"} sx={{ mt: 4 }}>
        이메일로 비밀번호 전송
      </Button>
      {isOpen && <Modal onToggle={isSuccess ? goLogin : controller} isOpen={isOpen} message={message} home={false} />}
    </>
  );
};
export default ForgotPasswordConfirm;
