import Box from "@mui/material/Box";
import UploadBox from "../_common/UploadBox";
import { ChangeEvent, useState } from "react";
import { Typography } from "@mui/material";
type ImageUploadProps = {
  setImage: (image: File) => void;
};
const ImageUpload = ({ setImage }: ImageUploadProps) => {
  const [imgPreview, setImgPreview] = useState<null | string>(null);
  const [isError, setIsError] = useState(false);
  const onChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;
    if (!files || files.length === 0) return setIsError(true);
    const reader = new FileReader();
    reader.onloadend = function (this) {
      if (this.result) setImgPreview(this.result.toString());
    };
    reader.readAsDataURL(files[0]);
    setImage(files[0]);
  };
  if (isError) return <Typography>애러가 발생했습니다.</Typography>;
  return (
    <Box>
      <label htmlFor="fileUpload">
        {imgPreview ? (
          <Box
            sx={(theme) => ({
              width: "100%",
              height: "200px",
              backgroundColor: "#fafafa",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: theme.palette.grey[100],
              },
            })}
            display={"flex"}
            justifyContent={"center"}
            boxShadow={(theme) => theme.shadows[2]}
            borderRadius={"4px"}
            overflow={"hidden"}
          >
            <img
              src={imgPreview}
              style={{ objectFit: "contain" }}
              alt=""
              width={"inherit"}
            />
          </Box>
        ) : (
          <UploadBox title={"파일업로드"} />
        )}
      </label>
      <input
        type="file"
        style={{ display: "none" }}
        name={"image"}
        id={"fileUpload"}
        onChange={onChangeImage}
        accept=".jpg, .png, .jpeg, .JPG, .JPEG, .PNG"
      />
    </Box>
  );
};
export default ImageUpload;
