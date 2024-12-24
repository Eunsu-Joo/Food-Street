import { Avatar, CircularProgress, Stack, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import axios from "axios";
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
  console.log({ isLoading });
  if (isLoading) {
    return (
      <Stack height={"100vh"} zIndex={11000} overflow={"hidden"} bgcolor={"rgba(0,0,0,0.4)"} color={"#ffffff"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} width={"100%"} left={0} top={0} right={0} bottom={0} position={"fixed"} sx={{ touchAction: "none" }}>
        <CircularProgress color={"inherit"} size={50} />
        <Typography component={"p"} letterSpacing={4} ml={3.5} pt={4} fontSize={24} fontFamily={"Montserrat"} color={"inherit"}>
          Loading...
        </Typography>
      </Stack>
    );
  }
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
    </>
  );
};
export default ProfileImage;
