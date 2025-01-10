import { Box, styled, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const StyledUploadBox = styled(Box)(({ theme }) => ({
  boxShadow: theme.shadows[2],
  height: "330px",
  borderRadius: "4px",
  backgroundColor: theme.palette.grey[50],
  cursor: "pointer",
  transition: theme.transitions.easing.easeInOut,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  "&:hover": {
    backgroundColor: theme.palette.grey[100]
  }
}));

const UploadBox = () => {
  return (
    <StyledUploadBox>
      <CloudUploadIcon fontSize={"large"} color="primary" />
      <Typography color={(theme) => theme.palette.primary.main}>파일업로드</Typography>
    </StyledUploadBox>
  );
};
export default UploadBox;
