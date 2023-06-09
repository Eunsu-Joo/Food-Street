import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useValidator from "../../../hooks/useValidator";
import ProfileImage from "../_common/ProfileImage";
import Box from "@mui/material/Box";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import PATH from "../../../constants/path";
import { UserType } from "../../../types/user";
import { questionList } from "../../../data";
import useModal from "../../../hooks/useModal";
import { updateSessionUser } from "../../../utils/storage";
import fetcher from "../../../graphql/fetcher";
import { UPDATE_USER } from "../../../graphql/user";
import Loading from "../../_common/loading";
import Modal from "../../modal";
import QUERY_KEYS from "../../../constants/querykeys";

const ProfileForm = ({ user }: { user: UserType }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<any>({
    ...user
  });
  const [image, setImage] = useState<any>(user.image);
  const [message, setMessage] = useState("");
  const { error: validateError, setError, validateUserInfo } = useValidator(inputs);
  const { isOpen, controller } = useModal();
  const back = () => {
    navigate("/");
    controller();
  };
  const { mutate, isLoading, isSuccess } = useMutation(
    () => {
      return fetcher(UPDATE_USER, { ...inputs, image });
    },
    {
      onSuccess: async (data: { update: UserType }) => {
        //쿼리 무효화 (이 쿼리 다시 읽음)
        await queryClient.invalidateQueries([QUERY_KEYS.USER]);
        updateSessionUser(data.update);
        setMessage("정보가 수정되었습니다.");
        controller();
      },
      onError: (error: any) => {
        const message = error.response?.errors[0].message ?? "알수없는 애러가 발생했습니다.";
        setMessage(message);
        controller();
      }
    }
  );
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
      mutate();
    }
  };
  const onChangeSelect = (event: SelectChangeEvent) => {
    setInputs({ ...inputs, questionIndex: +event.target.value });
  };
  if (isLoading) return <Loading />;
  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <ProfileImage onChange={setImage} defaultImage={user.image} error={!!validateError.message["image"]} />
      <Stack sx={{ mt: 2 }}>
        <TextField placeholder={"이메일을 입력해주세요."} name={"email"} onChange={onChange} value={inputs.email} sx={{ mb: 2 }} error={!!validateError.message["email"]} helperText={validateError?.message["email"] ?? null} />
        <TextField placeholder={"닉네임을 입력해주세요."} name={"username"} onChange={onChange} value={inputs.username} sx={{ mb: 2 }} error={!!validateError.message["username"]} helperText={validateError?.message["username"] ?? null} />
        <FormControl
          variant={"outlined"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%"
          }}
        >
          <Select sx={{ width: "inherit" }} placeholder={"이메일 주소"} value={inputs.questionIndex.toString()} onChange={onChangeSelect} className={"emailAddress"}>
            {questionList.map((item, index) => (
              <MenuItem key={index} value={item.index}>
                {item.question}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField margin={"normal"} variant="outlined" fullWidth={true} value={inputs.questionAnswer} placeholder={"아이디&비밀번호 답을 입력해주세요."} autoComplete={"off"} name={"questionAnswer"} onChange={onChange} error={!!validateError.message["questionAnswer"]} helperText={validateError.message["questionAnswer"] ?? null} />
        <Typography variant="body2" mt={2}>
          {"비밀번호 변경을 원하시나요? "}
          <Link to={PATH.CHANGE_PW}>
            <Typography component={"span"} color={"primary"} sx={{ textDecoration: "underline" }}>
              change password
            </Typography>
          </Link>
        </Typography>
        <Button variant={"contained"} size={"large"} sx={{ mt: 2 }} type={"submit"}>
          정보 수정
        </Button>
      </Stack>
      {isOpen && <Modal onToggle={isSuccess ? back : controller} isOpen={isOpen} message={message} home={isSuccess} />}
    </Box>
  );
};
export default ProfileForm;
