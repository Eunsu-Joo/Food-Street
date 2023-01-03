import { FormEvent } from "react";
import { Navigate } from "react-router-dom";
import useValidator from "../../../../hooks/useValidator";
import useUser from "../../../../hooks/useUser";
import useLogin from "../../../../hooks/useLogin";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import useInputs from "../../../../hooks/useInputs";
import useDebounce from "../../../../hooks/useDebounce";

const defaultValues = {
  identifier: "",
  password: ""
};

const LoginForm = () => {
  const { inputs, onChange } = useInputs({ defaultValues });
  const { identifier, password } = inputs;
  const { validateLogin, error: validateError, setError } = useValidator(inputs);
  const { user } = useUser();
  const { login } = useLogin({ setError });
  const { isDebounce, setIsDebounce } = useDebounce();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateLogin();
    if (isDebounce) return;
    setIsDebounce(true);
    if (isValid) return login({ identifier, password }); //로그인
  };

  return (
    <Box component={"form"} onSubmit={onSubmit}>
      <TextField autoFocus={true} id={"email"} sx={{ mb: 4, mt: 2 }} autoComplete="off" fullWidth={true} label="이메일" value={inputs.identifier} onChange={onChange} name={"identifier"} error={!!validateError.message["identifier"]} helperText={validateError.message["identifier"] ?? null} />
      <TextField fullWidth={true} id={"password"} aria-describedby="component-error-text" sx={{ mb: 1 }} type="password" autoComplete="current-password" name={"password"} label="비밀번호" value={inputs.password} onChange={onChange} error={!!validateError.message["password"]} helperText={validateError.message["password"] ?? null} />
      <Button variant={"contained"} fullWidth={true} size={"large"} sx={{ mt: 4 }} type={"submit"}>
        로그인
      </Button>
      {user && <Navigate to={"/"} />}
    </Box>
  );
};
export default LoginForm;
