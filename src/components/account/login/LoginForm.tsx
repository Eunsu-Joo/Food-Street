import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import useValidator from "../../../hooks/useValidator";
import useUser from "../../../hooks/useUser";
import { Navigate } from "react-router-dom";
import useLogin from "../../../hooks/useLogin";

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    identifier: "holicholicpop@gmail.com",
    password: "ghgh1212!!"
  });

  const { identifier, password } = inputs;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const { validateLogin, error: validateError, setError } = useValidator(inputs);
  const { user } = useUser();
  const { login } = useLogin({ setError });
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateLogin();
    if (isValid) return login({ identifier, password }); //로그인
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
