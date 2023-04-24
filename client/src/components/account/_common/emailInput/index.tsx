import FormControl from "@mui/material/FormControl";
import { MenuItem, Select, SelectChangeEvent, Typography, TextField, FormHelperText } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { emailList } from "../../../../data";
import EmailInputBox from "./emailInput.style";
import type EmailInputProps from "./emailInput.interface";

const EmailInput = ({ onChange, error, message, value }: EmailInputProps) => {
  const [email, setEmail] = useState(value?.split("@")[0] ?? "");
  const [emailAddress, setEmailAddress] = useState(value ? `@${value.split("@")[1]}` : "");
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangeEmailAddress = (event: SelectChangeEvent) => {
    setEmailAddress(event.target.value);
  };
  useEffect(() => {
    onChange(email + emailAddress);
  }, [email, emailAddress]);
  return (
    <>
      <EmailInputBox>
        <TextField margin={"normal"} autoComplete={"off"} value={email} onChange={onChangeEmail} variant={"standard"} error={error} label={"이메일"} />
        <Typography component={"span"} fontSize={20} mx={2} className={"font"}>
          @
        </Typography>
        <FormControl
          variant={"standard"}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Select sx={{ width: "inherit" }} placeholder={"이메일 주소"} value={emailAddress} onChange={onChangeEmailAddress} className={"emailAddress"}>
            {emailList.map((item, index) => (
              <MenuItem key={index} value={`@${item.value}`}>
                {item.value === "" ? <em style={{ fontStyle: "initial" }}>직접입력</em> : item.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </EmailInputBox>
      {error && <FormHelperText error={true}>{message}</FormHelperText>}
    </>
  );
};
export default React.memo(EmailInput);
