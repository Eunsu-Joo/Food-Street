import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useValidator from "../../../hooks/useValidator";
import Box from "@mui/material/Box";
import { Button, FormControlLabel, TextField, Checkbox } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import fetcher from "../../../graphql/fetcher";
import { LOGIN } from "../../../graphql/user";
import { UserType } from "../../../types/user";
import QUERY_KEYS from "../../../constants/querykeys";
import { LoginInputType } from "./index";
import useModal from "../../../hooks/useModal";
import Modal from "../../modal";
import { clearSessionAuth, getSessionAuth, updateSessionAuth, updateSessionUser } from "../../../utils/storage";

type LoginFormProps = {
  defaultValues: LoginInputType;
  setDefaultValues: Dispatch<SetStateAction<LoginInputType>>;
};

const LoginForm = ({ defaultValues: inputs, setDefaultValues }: LoginFormProps) => {
  const { email, password } = inputs;
  const { validateLogin, error: validateError, setError } = useValidator(inputs);
  const [checked, setChecked] = useState(!!email);
  const { isOpen, controller } = useModal();
  const message = useRef("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setDefaultValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    () => {
      return fetcher(LOGIN, { email, password });
    },
    {
      onSuccess: (data: { login: UserType }) => {
        updateSessionUser(data.login);
        //1. 로그인 후 쿼리 설정
        queryClient.setQueryData(QUERY_KEYS.USER, { user: data.login });
        navigate("/");
      },
      onError: (error: any) => {
        message.current = error.response?.errors[0].message ?? "알수없는 애러가 발생했습니다.";
        controller();
      }
    }
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateLogin();
    if (isValid) {
      mutate();
    }
    if (checked) updateSessionAuth({ email, password });
    else clearSessionAuth();
  };
  const onCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  useEffect(() => {
    setChecked(!!getSessionAuth());
  }, []);

  return (
    <Box component={"form"} onSubmit={onSubmit}>
      <TextField autoFocus={true} id={"email"} sx={{ mb: 4, mt: 2 }} autoComplete="off" fullWidth={true} label="이메일" value={inputs.email} onChange={onChange} name={"email"} error={!!validateError.message["email"]} helperText={validateError.message["email"] ?? null} />
      <TextField fullWidth={true} id={"password"} aria-describedby="component-error-text" sx={{ mb: 1 }} type="password" autoComplete="current-password" name={"password"} label="비밀번호" value={inputs.password} onChange={onChange} error={!!validateError.message["password"]} helperText={validateError.message["password"] ?? null} />
      <FormControlLabel control={<Checkbox checked={checked} onChange={onCheck} />} label="자동로그인" />
      <Button variant={"contained"} fullWidth={true} size={"large"} sx={{ mt: 4 }} type={"submit"}>
        로그인
      </Button>
      {isOpen && <Modal onToggle={controller} isOpen={isOpen} home={false} message={message.current} />}
    </Box>
  );
};
export default LoginForm;
