import Box from "@mui/material/Box";
import { Stack, styled, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextFieldBox from "./_common/TextFieldBox";
import Index from "./ImageUpload";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Location from "./Location";
import { StyledTextarea, StyledStack } from "./style";
import ImageUpload from "./ImageUpload";
const AddPost = () => {
  const [inputs, setInputs] = useState({
    name: "",
    start_time: "10:30",
    end_time: "20:30",
    contents: "",
    address: "",
  });
  const [image, setImage] = useState<null | File>(null);

  const onChangeInputs = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onChangeImage = (image: File) => {
    setImage(image);
  };
  const onChangeAddress = (address: string) => {
    setInputs({
      ...inputs,
      address,
    });
  };

  return (
    <Box>
      <h2> 맛집을 등록해 봅시다!</h2>
      <TextFieldBox label={"상호명"}>
        <TextField
          variant="outlined"
          fullWidth={true}
          name={"name"}
          placeholder={"상호명을 작성해주세요"}
          value={inputs.name}
          onChange={onChangeInputs}
        />
      </TextFieldBox>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={4} sx={{ mt: 4 }} direction={"row"}>
          <TextField
            label="오픈 시간"
            type="time"
            name={"start_time"}
            value={inputs.start_time}
            onChange={onChangeInputs}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
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
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
        </Stack>
      </LocalizationProvider>
      <TextFieldBox label={"상세내용"}>
        <StyledTextarea
          aria-label="empty textarea"
          placeholder="맛집에 자세한 내용을 적어주세요"
          style={{ width: "100%" }}
          minRows={10}
          tabIndex={1}
          name={"contents"}
          value={inputs.contents}
          onChange={onChangeInputs}
        />
      </TextFieldBox>
      <StyledStack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        alignItems={"center"}
        divider={<Divider orientation="vertical" flexItem />}
        sx={{ mt: 4 }}
      >
        <TextFieldBox label={"이미지"} sx={{ width: "50%", mt: 0 }}>
          <ImageUpload setImage={onChangeImage} />
        </TextFieldBox>
        <TextFieldBox label={"위치"} sx={{ width: "50%" }}>
          <Location
            onChangeAddress={onChangeAddress}
            address={inputs.address}
          />
        </TextFieldBox>
      </StyledStack>
      <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        <Button sx={{ mr: 6, px: 6 }} variant={"outlined"} size={"large"}>
          취소
        </Button>
        <Button sx={{ mr: 2, px: 6 }} variant={"contained"} size={"large"}>
          등록
        </Button>
      </Box>
    </Box>
  );
};
export default AddPost;
