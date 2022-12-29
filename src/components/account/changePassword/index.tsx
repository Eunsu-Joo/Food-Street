import AccountLayout from "../_common/accountLayout";
import { FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import useInputs from "../../../hooks/useInputs";
import useValidator from "../../../hooks/useValidator";
import { Navigate } from "react-router-dom";
import PATH from "../../../constants/path";
import useUser from "../../../hooks/useUser";
import useChangePassword from "../../../hooks/useChangePassword";
import useModal from "../../../hooks/useModal";
import Modal from "../../_common/modal";

const defaultValues = {
  currentPassword: "ghgh1212!!",
  password: "ghgh1212!!",
  passwordConfirmation: "ghgh1212!!"
};

const ResetPassword = () => {
  const { user } = useUser();
  const { inputs, onChange } = useInputs({ defaultValues });
  const { currentPassword, password, passwordConfirmation } = inputs;
  const { error: validateError, setError, validateChangePw } = useValidator(inputs);
  const { isOpen, controller } = useModal();
  const { changeUserPassword } = useChangePassword({ setError, onSuccess: controller });
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidate = validateChangePw();
    if (isValidate) {
      return changeUserPassword({ currentPassword, password, passwordConfirmation });
    }
  };
  if (!user) return <Navigate to={PATH.HOME} />;
  return (
    <AccountLayout title={"CHANGE PASSWORD"}>
      <Box component={"form"} onSubmit={handleSubmit}>
        <TextField error={!!validateError.message["currentPassword"]} helperText={validateError.message["currentPassword"] ?? null} margin={"normal"} variant={"outlined"} fullWidth={true} value={inputs.currentPassword} onChange={onChange} label={"현재 비밀번호"} name={"currentPassword"} type={"password"} />
        <TextField error={!!validateError.message["password"]} helperText={validateError.message["password"] ?? null} margin={"normal"} variant={"outlined"} fullWidth={true} value={inputs.password} onChange={onChange} label={"새로운 비밀번호"} name={"password"} type={"password"} />
        <TextField error={!!validateError.message["passwordConfirmation"]} helperText={validateError.message["passwordConfirmation"] ?? null} margin={"normal"} variant={"outlined"} fullWidth={true} value={inputs.passwordConfirmation} onChange={onChange} label={"새로운 비밀번호 확인"} name={"passwordConfirmation"} type={"password"} />
        <Button variant={"contained"} fullWidth={true} size={"large"} sx={{ mt: 4 }} type={"submit"}>
          로그인
        </Button>
      </Box>
      {isOpen && <Modal onToggle={controller} isOpen={isOpen} message={"비밀번호가 성공적으로 변경되었습니다."} />}
    </AccountLayout>
  );
};
export default ResetPassword;
