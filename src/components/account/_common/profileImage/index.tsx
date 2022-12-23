import { Avatar, Stack, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import checkImage from "../../../../utils/checkImage";

const ProfileImage = ({ onChange, error }: { onChange: Dispatch<SetStateAction<File | null>>; error: boolean }) => {
  const [preview, setPreview] = useState<null | string>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const isValid = checkImage(file.name);
    if (!isValid) return;
    onChange(file);
    const reader = new FileReader();
    reader.onloadend = function (this) {
      if (this.result) setPreview(this.result.toString());
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      <input type="file" id={"profileImage"} ref={fileInputRef} accept=".jpg, .png, .jpeg, .JPG, .JPEG, .PNG" onChange={selectImage} style={{ display: "none" }} />
      <label htmlFor="profileImage">
        <Stack direction={"column"} alignItems={"center"}>
          <Avatar sx={{ width: 100, height: 100, cursor: "pointer" }} src={preview ?? undefined} />
          <Typography fontSize={18} mt={1} color={error ? "error" : "inherit"}>
            프로필 설정
          </Typography>
          {error && (
            <Typography color={"error"} fontSize={14}>
              이미지 애러가 발생했습니다. 관리자에게 문의해주세요.
            </Typography>
          )}
        </Stack>
      </label>
    </>
  );
};
export default ProfileImage;
