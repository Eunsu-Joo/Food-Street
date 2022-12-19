import { ChangeEvent, FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import EmailInput from "../_common/emailInput";
import useValidator from "../../../hooks/useValidator";
import { useMutation } from "react-query";
import useUser from "../../../hooks/useUser";
import useModal from "../../../hooks/useModal";
import WelcomeModal from "../../_common/modal/welcomeModal";
import { Navigate } from "react-router-dom";
import { signupUser } from "../../../utils/fetcher";
import ERROR_MSG from "../../../constants/errorMsg";
import STATUS from "../../../constants/status";
import type { CustomErrorType } from "../../../types/error";
import type { AxiosError } from "axios";

const SignupForm = () => {
  const [inputs, setInputs] = useState({
    username: "Eunsu",
    email: "holicholicpop@gmail.com",
    password: "ghgh1212!!",
    passwordCheck: "ghgh1212!!"
  });
  const { email, password, username } = inputs;
  const { error: validateError, validateSignup, setError } = useValidator(inputs);
  const { user, updateUser } = useUser();
  const { isOpen, controller } = useModal();
  const onChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };
  const onChangeEmail = (value: string) => {
    setInputs({ ...inputs, email: value });
  };

  const { mutate: register } = useMutation(
    () => {
      return signupUser({
        email,
        username,
        password
      });
    },
    {
      onError: (error: AxiosError<CustomErrorType>) => {
        if (!error.response) throw error;
        let { status, message } = error.response.data;
        if (message === ERROR_MSG.DUPLICATED_ID) message = "이미 존재하는 이메일 / 닉네임 입니다.";
        if (status === STATUS.NOT_ALLOWED || status === STATUS.INTERVAL) message = "서버애러가 발생했습니다. 관리자에게 문의해주세요.";
        setError({
          isError: status !== 200,
          message: { ...validateError.message, username: message }
        });
      },
      onSuccess: (data) => {
        updateUser(data);
        controller();
      }
    }
  );
  const onCloseModal = () => {
    controller();
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateSignup();
    if (isValid) return register();
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
      {isOpen && <WelcomeModal onToggle={onCloseModal} isOpen={isOpen} />}
      {user && !isOpen && <Navigate to={"/"} />}
    </Box>
  );
};
export default SignupForm;
