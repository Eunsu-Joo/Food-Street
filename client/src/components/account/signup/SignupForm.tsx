import React, { ChangeEvent, FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Select, TextField, MenuItem, FormControl, InputLabel, SelectChangeEvent, FormHelperText } from "@mui/material";
import EmailInput from "../_common/EmailInput";
import useValidator from "../../../hooks/useValidator";
import useModal from "../../../hooks/useModal";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from "../../modal";
import useInputs from "../../../hooks/useInputs";
import { questionList } from "../../../data";
import { useMutation, useQueryClient } from "react-query";
import fetcher from "../../../graphql/fetcher";
import { SIGNUP } from "../../../graphql/user";
import QUERY_KEYS from "../../../constants/querykeys";
import USER from "../../../constants/user";
import { UserType } from "../../../types/user";
import ProfileImage from "../_common/ProfileImage";
import { updateSessionUser } from "../../../utils/storage";

const defaultValues = {
  username: "",
  email: "",
  password: "",
  passwordCheck: "",
  questionIndex: 0,
  questionAnswer: ""
};

const SignupForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const { inputs, setInputs, onChange } = useInputs({ defaultValues });
  const { error: validateError, validateSignup } = useValidator(inputs);
  const { isOpen, controller } = useModal();
  const navigate = useNavigate();

  const back = () => {
    navigate("/");
    controller();
  };
  const { mutate, isSuccess } = useMutation(
    () => {
      const { passwordCheck, ...rest } = inputs;
      return fetcher(SIGNUP, { image, ...rest });
    },
    {
      onSuccess: (data: { signup: UserType }) => {
        // //    TODO 리팩토링 할 때 http-cookie로 전환하기
        updateSessionUser(data.signup);
        setMessage(`방갑습니다 ${data.signup.username}님 😻😻`);
        controller();
      },
      onError: (error: any) => {
        const message = error.response?.errors[0].message ?? "알수없는 애러가 발생했습니다.";
        setMessage(message);
        controller();
      }
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
      <ProfileImage onChange={setImage} error={false} defaultImage={image} />
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
      {isOpen && <Modal onToggle={isSuccess ? back : controller} isOpen={isOpen} message={message} home={isSuccess} />}
    </Box>
  );
};
export default SignupForm;
