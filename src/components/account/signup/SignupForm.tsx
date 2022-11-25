import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import EmailInput from "./EmailInput";
import useValidator from "../../../hooks/useValidator";
const SignupForm = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  const { error, setError, validateSignup } = useValidator(inputs);

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
    console.log(isValid);
  };
  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <TextField
        variant="standard"
        fullWidth={true}
        label={"닉네임"}
        id={"username"}
        autoComplete={"off"}
        name={"username"}
        sx={{ mb: 2 }}
        onChange={onChangeInputs}
        error={!!error.message["username"]}
        autoFocus={true}
        helperText={
          !!error.message["username"] ? error.message["username"] : null
        }
      />

      <EmailInput
        onChange={onChangeEmail}
        error={!!error.message["email"]}
        message={!!error.message["email"] ? error.message["email"] : ""}
      />
      <TextField
        variant="standard"
        fullWidth={true}
        label={"비밀번호"}
        id={"username"}
        autoComplete={"off"}
        name={"password"}
        type={"password"}
        helperText={
          !!error.message["password"]
            ? error.message["password"]
            : "비밀번호는 특수문자와 숫자를 포함하여 8-15자로 작성해주세요."
        }
        sx={{ mb: 1 }}
        onChange={onChangeInputs}
        error={!!error.message["password"]}
      />
      <TextField
        variant="standard"
        fullWidth={true}
        type={"password"}
        label={"비밀번호 확인"}
        id={"passwordCheck"}
        autoComplete={"off"}
        name={"passwordCheck"}
        onChange={onChangeInputs}
        error={!!error.message["passwordCheck"]}
        helperText={
          !!error.message["passwordCheck"]
            ? error.message["passwordCheck"]
            : null
        }
      />
      <Button
        type="submit"
        variant={"contained"}
        fullWidth={true}
        size={"large"}
        sx={{ mt: 6 }}
      >
        회원가입
      </Button>
    </Box>
  );
};
export default SignupForm;
