import { Avatar, CircularProgress, Stack, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import axios from "axios";
import Loading from "../../_common/loading";
interface ProfileImageProps {
  onChange: Dispatch<SetStateAction<File | null>>;
  error: boolean;
  image: any;
}

const ProfileImage = ({ onChange, error, image }: ProfileImageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return alert("파일을 찾을 수 없습니다.");
    const file = event.target.files[0] as File;
    if (!/([^\s]+(?=\.(jpg|png|jpeg|PNG|JPG))\.\2)/.test(file.name)) return alert("PNG,JPG 이미지만 업로드 가능합니다.");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.onloadend = () => {
    //   setPreview(reader.result);
    // };
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    setIsLoading(true);
    const { data, status } = await axios.post(`https://api.cloudinary.com/v1_1/diuiwn91v/image/upload`, formData);

    if (status === 200) {
      onChange(data.url);
      setIsLoading(false);
    } else {
      return alert("이미지 로드 애러가 났습니다.");
    }
  };
  return (
    <>
      <input type="file" id={"profileImage"} ref={fileInputRef} accept=".jpg, .png, .jpeg, .JPG, .JPEG, .PNG" onChange={onChangeImage} style={{ display: "none" }} />
      <label htmlFor="profileImage">
        <Stack direction={"column"} alignItems={"center"}>
          <Avatar sx={{ width: 100, height: 100, cursor: "pointer" }} src={image} />
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
      {isLoading && <Loading />}
    </>
  );
};
export default ProfileImage;
