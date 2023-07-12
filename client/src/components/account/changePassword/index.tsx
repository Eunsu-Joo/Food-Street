import AccountLayout from "../_common/AccountLayout";
import { FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import useInputs from "../../../hooks/useInputs";
import useValidator from "../../../hooks/useValidator";
import { Navigate } from "react-router-dom";
import PATH from "../../../constants/path";
import useModal from "../../../hooks/useModal";
import Modal from "../../modal";
import { useMutation } from "react-query";
import fetcher from "../../../graphql/fetcher";
import { CHANGE_PASSWORD } from "../../../graphql/user";
import useUser from "../../../hooks/useUser";
import { getSessionAuth, updateSessionAuth } from "../../../utils/storage";

const defaultValues = {
  currentPassword: "",
  password: "",
  passwordConfirmation: ""
};

const ChangePassword = () => {
  const { inputs, onChange } = useInputs({ defaultValues });
  const [message, setMessage] = useState("");
  const { error: validateError, setError, validateResetPassword } = useValidator(inputs);
  const { isOpen, controller } = useModal();
  const { data } = useUser();

  const { mutate, isSuccess } = useMutation(
    () => {
      return fetcher(CHANGE_PASSWORD, { jwt: data.user.jwt, password: inputs.currentPassword, newPassword: inputs.password });
    },
    {
      onSuccess: () => {
        if (getSessionAuth()) {
          updateSessionAuth({
            email: data.user.email,
            password: inputs.password
          });
        }
        setMessage("비밀번호가 성공적으로 변경되었습니다.");
        controller();
      },
      onError: (error: any) => {
        const message = error.response?.errors[0].message ?? "알수없는 애러가 발생했습니다.";
        setMessage(message);
        controller();
      }
    }
  );
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidate = validateResetPassword();
    if (isValidate) {
      mutate();
    }
  };
  if (!data?.user) return <Navigate to={PATH.LOGIN} />;
  return (
    <AccountLayout title={"CHANGE PASSWORD"}>
      <Box component={"form"} onSubmit={handleSubmit}>
        <TextField error={!!validateError.message["currentPassword"]} helperText={validateError.message["currentPassword"] ?? null} margin={"normal"} variant={"outlined"} fullWidth={true} value={inputs.currentPassword} onChange={onChange} label={"현재 비밀번호"} name={"currentPassword"} type={"password"} />
        <TextField error={!!validateError.message["password"]} helperText={validateError.message["password"] ?? null} margin={"normal"} variant={"outlined"} fullWidth={true} value={inputs.password} onChange={onChange} label={"새로운 비밀번호"} name={"password"} type={"password"} />
        <TextField error={!!validateError.message["passwordConfirmation"]} helperText={validateError.message["passwordConfirmation"] ?? null} margin={"normal"} variant={"outlined"} fullWidth={true} value={inputs.passwordConfirmation} onChange={onChange} label={"새로운 비밀번호 확인"} name={"passwordConfirmation"} type={"password"} />
        <Button variant={"contained"} fullWidth={true} size={"large"} sx={{ mt: 4 }} type={"submit"}>
          비밀번호 변경
        </Button>
      </Box>
      {isOpen && <Modal onToggle={controller} isOpen={isOpen} message={message} home={!!isSuccess} />}
    </AccountLayout>
  );
};
export default ChangePassword;
