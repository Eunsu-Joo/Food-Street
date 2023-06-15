import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Button, InputAdornment, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { questionList } from "../../../data";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import useInputs from "../../../hooks/useInputs";
import useValidator from "../../../hooks/useValidator";
import { useNavigate } from "react-router-dom";
import PATH from "../../../constants/path";
import { useMutation } from "react-query";
import useModal from "../../../hooks/useModal";
import Modal from "../../modal";
import fetcher from "../../../graphql/fetcher";
import { FORGOT_PASSWORD } from "../../../graphql/user";
import { FormType } from "./index";

const defaultValues = {
  email: "",
  questionIndex: 0,
  questionAnswer: ""
};
const ForgotPasswordForm = ({ setForms }: { setForms: Dispatch<SetStateAction<null | FormType>> }) => {
  const { inputs, setInputs, onChange } = useInputs({ defaultValues });
  const { error: validateError, setError, validateEmail } = useValidator(inputs);
  const { isOpen, controller } = useModal();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { mutate } = useMutation(
    () => {
      const { email, questionIndex, questionAnswer } = inputs;
      return fetcher(FORGOT_PASSWORD, { email, questionIndex, questionAnswer });
    },
    {
      onSuccess: (data: { forgotPw: { password: string } }) => {
        setForms({
          email: inputs.email,
          password: data.forgotPw.password
        });
      },
      onError: (error: any) => {
        const message = error.response?.errors[0].message ?? "알수없는 애러가 발생했습니다.";
        setMessage(message);
        controller();
      }
    }
  );
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateEmail();
    if (isValid) {
      mutate();
    }
  };
  const onChangeSelect = (event: SelectChangeEvent) => {
    setInputs({ ...inputs, questionIndex: +event.target.value });
  };
  return (
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
      {isOpen && <Modal onToggle={controller} isOpen={isOpen} message={message} home={false} />}
    </Box>
  );
};
export default ForgotPasswordForm;
