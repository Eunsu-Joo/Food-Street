import { ChangeEvent, FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import useValidator from "../../../../hooks/useValidator";
import ProfileImage from "./ProfileImage";
import useUpdateUserInfo from "../../../../hooks/useUpdateUserInfo";
import useInputs from "../../../../hooks/useInputs";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import EmailInput from "../../_common/emailInput";
import PATH from "../../../../constants/path";
import type { UserType } from "../../../../types/user";

const ProfileForm = ({ user }: { user: UserType }) => {
  const defaultValues = {
    username: user?.user.username ?? "",
    email: user?.user.email ?? ""
  };
  const { inputs, setInputs, onChange } = useInputs({ defaultValues });
  const [image, setImage] = useState<null | File>(null);
  const { error: validateError, setError, validateUserInfo } = useValidator(inputs);
  const { updateUser } = useUpdateUserInfo({ setError });
  const defaultImage = user.user.profile_image?.url ?? undefined;

  const onChangeEmail = (value: string) => {
    setInputs({ ...inputs, email: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidate = validateUserInfo();
    if (isValidate) {
      return updateUser({ image, email: inputs.email, username: inputs.username });
    }
  };

  if (!user) return <Navigate to={PATH.HOME} />;

  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <ProfileImage defaultImage={defaultImage} onChange={setImage} error={!!validateError.message["image"]} />
      <TextField variant="standard" fullWidth={true} value={inputs.username} label={"닉네임"} id={"username"} autoComplete={"off"} name={"username"} sx={{ mb: 2 }} onChange={onChange} error={!!validateError.message["username"]} autoFocus={true} helperText={!!validateError.message["username"] ? validateError.message["username"] : null} />
      <EmailInput value={inputs.email} onChange={onChangeEmail} error={!!validateError.message["email"]} message={!!validateError.message["email"] ? validateError.message["email"] : ""} />
      <Button type="submit" variant={"contained"} fullWidth={true} size={"large"} sx={{ mt: 6 }}>
        정보수정
      </Button>
    </Box>
  );
};
export default ProfileForm;
