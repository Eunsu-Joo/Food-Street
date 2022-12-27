import { ChangeEvent, FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import EmailInput from "../_common/emailInput";
import useValidator from "../../../hooks/useValidator";
import useUser from "../../../hooks/useUser";
import useModal from "../../../hooks/useModal";
import { Navigate } from "react-router-dom";
import useSignup from "../../../hooks/useSignup";
import TextModal from "../../_common/modal/TextModal";

const SignupForm = () => {
  const [inputs, setInputs] = useState({
    username: "Eunsu",
    email: "holicholicpop@gmail.com",
    password: "ghgh1212!!",
    passwordCheck: "ghgh1212!!"
  });
  const { email, password, username } = inputs;
  const { error: validateError, validateSignup, setError } = useValidator(inputs);
  const { user } = useUser();
  const { isOpen, controller } = useModal();
  const { register } = useSignup({ setError });
  const onChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };
  const onChangeEmail = (value: string) => {
    setInputs({ ...inputs, email: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateSignup();
    if (isValid) {
      register({ username, password, email });
      controller();
    }
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <TextField variant="standard" fullWidth={true} value={inputs.username} label={"닉네임"} id={"username"} autoComplete={"off"} name={"username"} sx={{ mb: 2 }} onChange={onChangeInputs} error={!!validateError.message["username"]} autoFocus={true} helperText={!!validateError.message["username"] ? validateError.message["username"] : null} />
      <EmailInput value={inputs.email} onChange={onChangeEmail} error={!!validateError.message["email"]} message={!!validateError.message["email"] ? validateError.message["email"] : ""} />
      <TextField
        value={inputs.password}
        variant="standard"
        fullWidth={true}
        label={"비밀번호"}
        id={"password"}
        autoComplete={"off"}
        name={"password"}
        type={"password"}
        helperText={!!validateError.message["password"] ? validateError.message["password"] : "비밀번호는 특수문자와 숫자를 포함하여 8-15자로 작성해주세요."}
        sx={{ mb: 1 }}
        onChange={onChangeInputs}
        error={!!validateError.message["password"]}
      />
      <TextField value={inputs.passwordCheck} variant="standard" fullWidth={true} type={"password"} label={"비밀번호 확인"} id={"passwordCheck"} autoComplete={"off"} name={"passwordCheck"} onChange={onChangeInputs} error={!!validateError.message["passwordCheck"]} helperText={!!validateError.message["passwordCheck"] ? validateError.message["passwordCheck"] : null} />
      <Button type="submit" variant={"contained"} fullWidth={true} size={"large"} sx={{ mt: 6 }}>
        회원가입
      </Button>
      {isOpen && (
        <TextModal onToggle={controller} isOpen={isOpen}>
          {user?.user.username}님 방갑습니다!
        </TextModal>
      )}
      {user && !isOpen && <Navigate to={"/"} />}
    </Box>
  );
};
export default SignupForm;
