import TextFieldBox from "../_common/TextFieldBox";
import { Button, FormHelperText, Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Divider from "@mui/material/Divider";
import ImageUpload from "./ImageUpload";
import Box from "@mui/material/Box";
import { ChangeEvent, useState } from "react";
import KakaoMap from "./kakaoMap";
import useModal from "../../../hooks/useModal";
import Modal from "../../modal";
import useValidator from "../../../hooks/useValidator";
import PATH from "../../../constants/path";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: "4px",
  paddingLeft: "8px",
  paddingTop: "8px",
  fontSize: "16px",
  fontFamily: "Noto Sans KR,sans-serif",
  "&:focus": {
    outlineColor: theme.palette.primary.main
  },
  "&::placeholder": {
    color: theme.palette.grey[400],
    fontWeight: 400
  },
  "&::hover": {
    borderColor: "#000"
  }
}));
const AddPostForm = () => {
  const [inputs, setInputs] = useState({
    name: "",
    start_time: "10:30",
    end_time: "20:30",
    contents: "",
    address: ""
  });
  const [image, setImage] = useState<null | File>(null);
  const { isOpen, controller } = useModal();
  const navigator = useNavigate();
  const { error: validateError, setError, validateAddPost } = useValidator(inputs);
  const onChangeInputs = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const onChangeImage = (image: File) => {
    setImage(image);
  };
  const onChangeAddress = (address: string) => {
    setInputs({
      ...inputs,
      address
    });
  };
  const handleSubmit = () => {
    const isValidate = validateAddPost();
    if (isValidate) {
    }
  };

  return (
    <>
      <TextFieldBox label={"상호명"} required={true}>
        <TextField autoComplete={"off"} variant="outlined" fullWidth={true} name={"name"} placeholder={"상호명을 작성해주세요"} value={inputs.name} onChange={onChangeInputs} />
        {!!validateError.message["name"] && <FormHelperText error={true}>{validateError.message["name"]}</FormHelperText>}
      </TextFieldBox>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction={"row"} mb={4} spacing={2}>
          <TextField
            label="오픈 시간"
            type="time"
            name={"start_time"}
            value={inputs.start_time}
            onChange={onChangeInputs}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 300 // 5 min
            }}
            sx={{ width: 150 }}
          />
          <TextField
            name={"end_time"}
            value={inputs.end_time}
            onChange={onChangeInputs}
            label="마감 시간"
            type="time"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 300 // 5 min
            }}
            sx={{ width: 150 }}
          />
        </Stack>
      </LocalizationProvider>
      <TextFieldBox label={"상세내용"} required={true}>
        <StyledTextarea aria-label="empty textarea" placeholder="맛집에 자세한 내용을 적어주세요" style={{ width: "100%" }} minRows={10} tabIndex={1} name={"contents"} value={inputs.contents} onChange={onChangeInputs} />
        {!!validateError.message["contents"] && <FormHelperText error={true}>{validateError.message["contents"]}</FormHelperText>}
      </TextFieldBox>
      <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 1, sm: 2, md: 4 }} alignItems={"center"} divider={<Divider orientation="vertical" flexItem />}>
        <TextFieldBox label={"이미지"} sx={{ width: { xs: "100%", md: "50%" }, mb: 0 }}>
          <ImageUpload setImage={onChangeImage} />
        </TextFieldBox>
        {!!validateError.message["image"] && <FormHelperText error={true}>{validateError.message["image"]}</FormHelperText>}
        <TextFieldBox label={"주소 찾기"} sx={{ width: "100%" }}>
          <Typography>주소명 : {inputs.address}</Typography>
          <KakaoMap onChangeAddress={onChangeAddress} />
        </TextFieldBox>
      </Stack>
      <Box display={"flex"} justifyContent={"center"} mt={6}>
        <Button sx={{ mr: 2, px: 6 }} variant={"outlined"} size={"large"} onClick={() => navigator(PATH.HOME)}>
          취소
        </Button>
        <Button sx={{ mr: 2, px: 6 }} variant={"contained"} size={"large"} onClick={handleSubmit}>
          등록
        </Button>
      </Box>
      {isOpen && <Modal onToggle={controller} isOpen={isOpen} message={"성공적으로 포스팅 되었습니다. 홈으로 이동할까요?"} />}
    </>
  );
};
export default AddPostForm;
