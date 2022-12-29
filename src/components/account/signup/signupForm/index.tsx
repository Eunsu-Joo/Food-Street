import { ChangeEvent, FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import EmailInput from "../../_common/emailInput";
import useValidator from "../../../../hooks/useValidator";
import useUser from "../../../../hooks/useUser";
import useModal from "../../../../hooks/useModal";
import { Navigate } from "react-router-dom";
import useSignup from "../../../../hooks/useSignup";
import Modal from "../../../_common/modal";
import useInputs from "../../../../hooks/useInputs";
const defaultValues = {
  username: "Eunsu",
  email: "holicholicpop@gmail.com",
  password: "ghgh1212!!",
  passwordCheck: "ghgh1212!!"
};

const SignupForm = () => {
  const { inputs, setInputs, onChange } = useInputs({ defaultValues });
  const { email, password, username } = inputs;
  const { error: validateError, validateSignup, setError } = useValidator(inputs);
  const { user } = useUser();
  const { isOpen, controller } = useModal();
  const { register } = useSignup({ setError, onSuccess: controller });

  const onChangeEmail = (value: string) => {
    setInputs({ ...inputs, email: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateSignup();
    if (isValid) {
      return register({ username, password, email });
    }
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <TextField margin={"normal"} variant="standard" fullWidth={true} value={inputs.username} label={"닉네임"} autoComplete={"off"} name={"username"} onChange={onChange} error={!!validateError.message["username"]} autoFocus={true} helperText={validateError.message["username"] ?? null} />
      <EmailInput value={inputs.email} onChange={onChangeEmail} error={!!validateError.message["email"]} message={validateError.message["email"] ?? ""} />
      <TextField margin={"normal"} value={inputs.password} variant="standard" fullWidth={true} label={"비밀번호"} name={"password"} type={"password"} helperText={!!validateError.message["password"] ? validateError.message["password"] : "비밀번호는 특수문자와 숫자를 포함하여 8-15자로 작성해주세요."} onChange={onChange} error={!!validateError.message["password"]} />
      <TextField margin={"normal"} value={inputs.passwordCheck} variant="standard" fullWidth={true} type={"password"} label={"비밀번호 확인"} name={"passwordCheck"} onChange={onChange} error={!!validateError.message["passwordCheck"]} helperText={validateError.message["passwordCheck"] ?? null} />
      <Button type="submit" variant={"contained"} fullWidth={true} size={"large"} sx={{ mt: 6 }}>
        회원가입
      </Button>
      {isOpen && <Modal onToggle={controller} isOpen={isOpen} message={`${user?.user.username}님 방갑습니다!`} />}
      {user && !isOpen && <Navigate to={"/"} />}
    </Box>
  );
};
export default SignupForm;
