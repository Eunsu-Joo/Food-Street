import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useValidator from "../../../hooks/useValidator";
import ProfileImage from "../_common/ProfileImage";
import Box from "@mui/material/Box";
import { Button, Stack, TextField } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";

const ProfileForm = ({ user }: { user: any }) => {
  const queryClient = useQueryClient();
  const [inputs, setInputs] = useState({
    ...user
  });
  const [image, setImage] = useState<any>(null);
  const { error: validateError, setError, validateUserInfo } = useValidator(inputs);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidate = validateUserInfo();
    if (isValidate) {
      //TODO 유저 정보 변경 API 만들어야 함.
      console.log({ ...inputs, image });
    }
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <ProfileImage onChange={setImage} defaultImage={user.image} error={!!validateError.message["image"]} />
      <Stack sx={{ mt: 2 }}>
        <TextField placeholder={"이메일을 입력해주세요."} name={"email"} onChange={onChange} value={inputs.email} sx={{ mb: 2 }} error={!!validateError.message["email"]} helperText={validateError?.message["email"] ?? null} />
        <TextField placeholder={"닉네임을 입력해주세요."} name={"username"} onChange={onChange} value={inputs.username} sx={{ mb: 2 }} error={!!validateError.message["username"]} helperText={validateError?.message["username"] ?? null} />
        <TextField type={"password"} placeholder={"비밀번호를 입력해주세요."} name={"password"} onChange={onChange} value={inputs.password} sx={{ mb: 2 }} error={!!validateError.message["password"]} helperText={validateError?.message["password"] ?? null} />
        <Button variant={"contained"} size={"large"} sx={{ mt: 4 }} type={"submit"}>
          정보 수정
        </Button>
      </Stack>
    </Box>
  );
};
export default ProfileForm;
