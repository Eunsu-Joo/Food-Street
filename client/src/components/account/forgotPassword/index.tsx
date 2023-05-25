import AccountLayout from "../_common/AccountLayout";
import FormControl from "@mui/material/FormControl";
import { Button, FormHelperText, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import useValidator from "../../../hooks/useValidator";
import { questionList } from "../../../data";
import useInputs from "../../../hooks/useInputs";
import SESSION_KEYS from "../../../constants/sessionKeys";
import { useNavigate } from "react-router-dom";
import PATH from "../../../constants/path";
const defaultValues = {
  email: "",
  questionIndex: 0,
  questionAnswer: ""
};
const ForgotPassword = () => {
  const { inputs, setInputs, onChange } = useInputs({ defaultValues });
  const { error: validateError, setError, validateEmail } = useValidator(inputs);
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateEmail();
    if (isValid) {
      //  API 성공 후
      // sessionStorage.setItem(SESSION_KEYS.USER, inputs.email as string);
      navigate(PATH.RESET_PW);
    }
  };
  const onChangeSelect = (event: SelectChangeEvent) => {
    setInputs({ ...inputs, questionIndex: +event.target.value });
  };
  return (
    <AccountLayout title={"forgot password"}>
      <Box onSubmit={handleSubmit} component={"form"}>
        <FormControl variant={"outlined"} sx={{ mt: 2 }} error={!!validateError.message["email"]} fullWidth={true}>
          <OutlinedInput
            id={"send_email"}
            autoFocus={true}
            startAdornment={
              <InputAdornment position={"start"}>
                <MailOutlineIcon />
              </InputAdornment>
            }
            value={inputs.email}
            name={"email"}
            onChange={onChange}
            placeholder={"이메일을 입력해주세요."}
            autoComplete={"off"}
            error={!!validateError.message["email"]}
          />
        </FormControl>
        <FormControl
          variant={"standard"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            mt: 2,
            mb: 2
          }}
        >
          <Select sx={{ width: "inherit" }} variant={"outlined"} placeholder={"이메일 주소"} value={inputs.questionIndex.toString()} onChange={onChangeSelect} className={"emailAddress"}>
            {questionList.map((item, index) => (
              <MenuItem key={index} value={item.index}>
                {item.question}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant={"outlined"} error={!!validateError.message["questionAnswer"]} fullWidth={true}>
          <OutlinedInput id={"questionAnswer"} value={inputs.questionAnswer} name={"questionAnswer"} onChange={onChange} placeholder={"답을 입력해주세요."} autoComplete={"off"} error={!!validateError.message["questionAnswer"]} />
        </FormControl>

        <Button type="submit" variant={"contained"} fullWidth={true} size={"large"} sx={{ mt: 4 }}>
          비밀번호 찾기
        </Button>
      </Box>
    </AccountLayout>
  );
};
export default ForgotPassword;
