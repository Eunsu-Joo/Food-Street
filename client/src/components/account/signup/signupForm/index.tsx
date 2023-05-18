import React, { ChangeEvent, FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Select, TextField, MenuItem, FormControl, InputLabel, SelectChangeEvent, FormHelperText } from "@mui/material";
import EmailInput from "../../_common/emailInput";
import useValidator from "../../../../hooks/useValidator";
import useUser from "../../../../hooks/useUser";
import useModal from "../../../../hooks/useModal";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from "../../../_common/modal";
import useInputs from "../../../../hooks/useInputs";
import { questionList } from "../../../../data";
import { useMutation } from "react-query";
import fetcher from "../../../../graphql/fetcher";
import { SIGNUP } from "../../../../graphql/user";

const defaultValues = {
  username: "",
  email: "",
  password: "",
  passwordCheck: "",
  questionIndex: 0,
  questionAnswer: ""
};

const SignupForm = () => {
  const { inputs, setInputs, onChange } = useInputs({ defaultValues });
  const { error: validateError, validateSignup, setError } = useValidator(inputs);
  const { user } = useUser();
  const { isOpen, controller } = useModal();
  const { username, email, password, questionIndex, questionAnswer } = inputs;
  const navigate = useNavigate();
  const { mutate } = useMutation(
    () => {
      return fetcher(SIGNUP, {
        username,
        email,
        password,
        questionIndex,
        questionAnswer
      });
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error, variables, context) => {}
    }
  );

  const onChangeEmail = (value: string) => {
    setInputs({ ...inputs, email: value });
  };
  const onChangeSelect = (event: SelectChangeEvent) => {
    setInputs({ ...inputs, questionIndex: +event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateSignup();
    if (isValid) {
      mutate();
    }
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <TextField margin={"normal"} variant="standard" fullWidth={true} value={inputs.username} label={"닉네임"} autoComplete={"off"} name={"username"} onChange={onChange} error={!!validateError.message["username"]} autoFocus={true} helperText={validateError.message["username"] ?? null} />
      <EmailInput value={inputs.email} onChange={onChangeEmail} error={!!validateError.message["email"]} message={validateError.message["email"] ?? ""} />
      <TextField margin={"normal"} value={inputs.password} variant="standard" fullWidth={true} label={"비밀번호"} name={"password"} type={"password"} helperText={!!validateError.message["password"] ? validateError.message["password"] : "비밀번호는 특수문자와 숫자를 포함하여 8-15자로 작성해주세요."} onChange={onChange} error={!!validateError.message["password"]} />
      <TextField margin={"normal"} value={inputs.passwordCheck} variant="standard" fullWidth={true} type={"password"} label={"비밀번호 확인"} name={"passwordCheck"} onChange={onChange} error={!!validateError.message["passwordCheck"]} helperText={validateError.message["passwordCheck"] ?? null} />
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
        <InputLabel sx={{ mb: 2 }}>아이디 & 비밀번호 질문</InputLabel>
        <Select sx={{ width: "inherit" }} placeholder={"이메일 주소"} value={inputs.questionIndex.toString()} onChange={onChangeSelect} className={"emailAddress"}>
          {questionList.map((item, index) => (
            <MenuItem key={index} value={item.index}>
              {item.question}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField margin={"normal"} variant="standard" fullWidth={true} value={inputs.questionAnswer} label={"아이디&비밀번호 질문 답"} autoComplete={"off"} name={"questionAnswer"} onChange={onChange} error={!!validateError.message["questionAnswer"]} helperText={validateError.message["questionAnswer"] ?? null} />
      <Button type="submit" variant={"contained"} fullWidth={true} size={"large"} sx={{ mt: 6 }}>
        회원가입
      </Button>
      {isOpen && <Modal onToggle={controller} isOpen={isOpen} message={`${user?.user.username}님 방갑습니다!`} />}
      {user && !isOpen && <Navigate to={"/"} />}
    </Box>
  );
};
export default SignupForm;
