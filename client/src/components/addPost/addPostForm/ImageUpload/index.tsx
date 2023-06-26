import Box from "@mui/material/Box";
import UploadBox from "./UploadBox";
import { ChangeEvent, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
type ImageUploadProps = {
  setImage: (image: File) => void;
};
const ImageUpload = ({ setImage }: ImageUploadProps) => {
  const [imgPreview, setImgPreview] = useState<any>(null);
  const [isError, setIsError] = useState(false);
  const onChangeImage = async(event: ChangeEvent<HTMLInputElement>) => { 
    if (!event.target.files) return alert("파일을 찾을 수 없습니다.");
    const file = event.target.files[0] as File;
    if (!/([^\s]+(?=\.(jpg|png|jpeg|PNG|JPG))\.\2)/.test(file.name)) return alert("PNG,JPG 이미지만 업로드 가능합니다.");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    const { data, status } = await axios.post(`https://api.cloudinary.com/v1_1/diuiwn91v/image/upload`, formData);
    if (status === 200) {
      setImage(data.url);
    } else {
      return alert("이미지 로드 애러가 났습니다.");
    }
  };
  if (isError) return <Typography>애러가 발생했습니다.</Typography>;
  return (
    <Box>
      <label htmlFor="fileUpload">
        {imgPreview ? (
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
            <img src={imgPreview} style={{ objectFit: "contain" }} alt="" width={"inherit"} />
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
