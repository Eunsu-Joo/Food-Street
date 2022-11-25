import FormControl from "@mui/material/FormControl";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
  TextField,
  FormHelperText,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { ChangeEvent, useEffect, useState } from "react";
import emailList from "../../../data/emailList";
const EmailInputBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "end",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    ".font": {
      fontSize: "16px",
    },
    ".emailAddress": {
      marginTop: "14px",
    },
  },
}));
interface EmailInputProps {
  onChange: (value: string) => void;
  error: boolean;
  message: string;
}
const EmailInput = ({ onChange, error, message }: EmailInputProps) => {
  const [email, setEmail] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
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
      <EmailInputBox sx={{ mb: 2 }}>
        <TextField
          id={"email"}
          autoComplete={"off"}
          value={email}
          onChange={onChangeEmail}
          variant={"standard"}
          error={error}
          label={"이메일"}
        />

        <Typography component={"span"} fontSize={20} mx={2} className={"font"}>
          @
        </Typography>
        <FormControl
          variant={"standard"}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Select
            sx={{ width: "inherit" }}
            placeholder={"이메일 주소"}
            value={emailAddress}
            onChange={onChangeEmailAddress}
            className={"emailAddress"}
          >
            {emailList.map((item, index) => (
              <MenuItem key={index} value={`@${item.value}`}>
                {item.value === "" ? (
                  <em style={{ fontStyle: "initial" }}>직접입력</em>
                ) : (
                  item.value
                )}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </EmailInputBox>
      {error && (
        <FormHelperText error={true} sx={{ mt: -1 }}>
          {message}
        </FormHelperText>
      )}
    </>
  );
};
export default React.memo(EmailInput);
