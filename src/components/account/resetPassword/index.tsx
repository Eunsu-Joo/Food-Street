import AccountLayout from "../_common/accountLayout";
import { FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <AccountLayout title={"RESET PASSWORD"}>
      <Box component={"form"} onSubmit={handleSubmit}>
        <TextField variant={"outlined"} fullWidth={true} label={"비밀번호"} id={"password"} autoComplete={"off"} name={"password"} type={"password"} />
      </Box>
    </AccountLayout>
  );
};
export default ResetPassword;
