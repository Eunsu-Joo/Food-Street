import Box from "@mui/material/Box";
import { ChangeEvent, FormEvent, useState } from "react";
import useUser from "../../../hooks/useUser";
import { Button, TextField } from "@mui/material";
import EmailInput from "../_common/emailInput";
import useValidator from "../../../hooks/useValidator";

const ProfileForm = () => {
  const { user } = useUser();
  const [inputs, setInputs] = useState({
    username: user?.user.username ?? "",
    email: user?.user.email ?? ""
  });
  const onChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };
  const onChangeEmail = (value: string) => {
    setInputs({ ...inputs, email: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const { error: validateError, validateSignup, setError } = useValidator(inputs);
  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <TextField variant="standard" fullWidth={true} value={inputs.username} label={"닉네임"} id={"username"} autoComplete={"off"} name={"username"} sx={{ mb: 2 }} onChange={onChangeInputs} error={!!validateError.message["username"]} autoFocus={true} helperText={!!validateError.message["username"] ? validateError.message["username"] : null} />
      <EmailInput value={inputs.email} onChange={onChangeEmail} error={!!validateError.message["email"]} message={!!validateError.message["email"] ? validateError.message["email"] : ""} />
      <Button type="submit" variant={"contained"} fullWidth={true} size={"large"} sx={{ mt: 6 }}>
        정보수정
      </Button>
    </Box>
  );
};
export default ProfileForm;
