import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import useValidator from "../../../hooks/useValidator";

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const { validateLogin, error } = useValidator(inputs);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateLogin();
  };

  return (
    <Box component={"form"} onSubmit={onSubmit}>
      <TextField
        autoFocus={true}
        id={"email"}
        sx={{ mb: 4, mt: 2 }}
        autoComplete="off"
        fullWidth={true}
        label="이메일"
        value={inputs.identifier}
        onChange={handleChange}
        name={"identifier"}
        error={!!error.message["identifier"]}
        helperText={
          !!error.message["identifier"] ? error.message["identifier"] : null
        }
      />
      <TextField
        fullWidth={true}
        id={"password"}
        aria-describedby="component-error-text"
        sx={{ mb: 1 }}
        type="password"
        autoComplete="current-password"
        name={"password"}
        label="비밀번호"
        value={inputs.password}
        onChange={handleChange}
        error={!!error.message["password"]}
        helperText={
          !!error.message["password"] ? error.message["password"] : null
        }
      />
      <Button
        variant={"contained"}
        fullWidth={true}
        size={"large"}
        sx={{ mt: 4 }}
        type={"submit"}
      >
        로그인
      </Button>
    </Box>
  );
};
export default LoginForm;
