import LoginLayout from "../_common/LoginLayout";
import FormControl from "@mui/material/FormControl";
import {
  Button,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { ChangeEvent, FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import useValidator from "../../../hooks/useValidator";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { error, setError, validateEmail } = useValidator({ email });
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateEmail();
  };
  return (
    <LoginLayout title={"forgot password"}>
      <Box onSubmit={handleSubmit} component={"form"}>
        <FormControl
          variant={"outlined"}
          sx={{ mt: 2 }}
          error={!!error.message["email"]}
          fullWidth={true}
        >
          <InputLabel id={"send_email"}>이메일</InputLabel>
          <OutlinedInput
            id={"send_email"}
            autoFocus={true}
            startAdornment={
              <InputAdornment position={"start"}>
                <MailOutlineIcon />
              </InputAdornment>
            }
            value={email}
            onChange={onChange}
            placeholder={"이메일을 입력해주세요."}
            label="Amount"
            autoComplete={"off"}
            error={!!error.message["email"]}
          />
          {!!error.message["email"] && (
            <FormHelperText sx={{ mt: 1 }}>
              {error.message["email"]}
            </FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          variant={"contained"}
          fullWidth={true}
          size={"large"}
          sx={{ mt: 4 }}
        >
          이메일 전송
        </Button>
      </Box>
    </LoginLayout>
  );
};
export default ForgotPassword;
