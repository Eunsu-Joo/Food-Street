import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import useValidator from "../../../hooks/useValidator";
import useUser from "../../../hooks/useUser";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { Navigate } from "react-router-dom";
import { loginUser } from "../../../utils/fetcher";
import { CustomErrorType } from "../../../types/error";
import ERROR_MSG from "../../../constants/errorMsg";
import STATUS from "../../../constants/status";

const LoginForm = () => {
  const { user, updateUser } = useUser();
  const [inputs, setInputs] = useState({
    identifier: "dmstn0557@naver.com",
    password: "ghgh1212!!"
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const { validateLogin, error: validateError, setError } = useValidator(inputs);
  const { mutate: login } = useMutation(() => loginUser({ identifier: inputs.identifier, password: inputs.password }), {
    onError: (error: AxiosError<CustomErrorType>) => {
      if (!error.response) throw error;
      let { status, message } = error.response.data;
      if (message === ERROR_MSG.INVALID) message = "아이디와 비밀번호를 다시 확인해주세요.";
      if (status === STATUS.NOT_ALLOWED || status === STATUS.INTERVAL) message = "서버애러가 발생했습니다. 관리자에게 문의해주세요.";
      setError({
        isError: status !== 200,
        message: { identifier: "", password: message }
      });
    },
    onSuccess: (data) => {
      updateUser(data);
    }
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateLogin();
    if (isValid) return login();
  };

  return (
    <Box component={"form"} onSubmit={onSubmit}>
      <TextField autoFocus={true} id={"email"} sx={{ mb: 4, mt: 2 }} autoComplete="off" fullWidth={true} label="이메일" value={inputs.identifier} onChange={handleChange} name={"identifier"} error={!!validateError.message["identifier"]} helperText={!!validateError.message["identifier"] ? validateError.message["identifier"] : null} />
      <TextField fullWidth={true} id={"password"} aria-describedby="component-error-text" sx={{ mb: 1 }} type="password" autoComplete="current-password" name={"password"} label="비밀번호" value={inputs.password} onChange={handleChange} error={!!validateError.message["password"]} helperText={!!validateError.message["password"] ? validateError.message["password"] : null} />
      <Button variant={"contained"} fullWidth={true} size={"large"} sx={{ mt: 4 }} type={"submit"}>
        로그인
      </Button>
      {user && <Navigate to={"/"} />}
    </Box>
  );
};
export default LoginForm;
