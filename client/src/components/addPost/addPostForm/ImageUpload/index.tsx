import Box from "@mui/material/Box";
import UploadBox from "./UploadBox";
import { ChangeEvent, useState } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import axios from "axios";
type ImageUploadProps = {
  setImage: (image: string) => void;
  image: null | string;
};
const ImageUpload = ({ setImage, image }: ImageUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const onChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return alert("파일을 찾을 수 없습니다.");
    const file = event.target.files[0] as File;
    if (!/([^\s]+(?=\.(jpg|png|jpeg|PNG|JPG))\.\2)/.test(file.name)) return alert("PNG,JPG 이미지만 업로드 가능합니다.");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    setIsLoading(true);
    const { data, status } = await axios.post(`https://api.cloudinary.com/v1_1/diuiwn91v/image/upload`, formData);
    if (status === 200) {
      setImage(data.url);
      setIsLoading(false);
    } else {
      return alert("이미지 로드 애러가 났습니다.");
    }
  };
  if (isError) return <Typography>애러가 발생했습니다.</Typography>;
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
    <Box>
      <label htmlFor="fileUpload">
        {image ? (
          <Box
            width={"100%"}
            height={{ xs: 250, md: 330 }}
            bgcolor={"#fafafa"}
            sx={(theme) => ({
              cursor: "pointer",
              "&:hover": {
                backgroundColor: theme.palette.grey[100]
              }
            })}
            display={"flex"}
            justifyContent={"center"}
            boxShadow={(theme) => theme.shadows[2]}
            borderRadius={"4px"}
            overflow={"hidden"}
          >
            <img src={image} style={{ objectFit: "contain" }} alt="" width={"inherit"} />
          </Box>
        ) : (
          <UploadBox />
        )}
      </label>
      <input type="file" style={{ display: "none" }} name={"image"} id={"fileUpload"} onChange={onChangeImage} accept=".jpg, .png, .jpeg, .JPG, .JPEG, .PNG" />
    </Box>
  );
};
export default ImageUpload;
