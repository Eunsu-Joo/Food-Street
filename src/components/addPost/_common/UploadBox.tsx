import { styled, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const StyledImage = styled("div")(({ theme }) => ({
  boxShadow: theme.shadows[2],
  height: "200px",
  borderRadius: "4px",
  backgroundColor: theme.palette.grey[50],
  cursor: "pointer",
  transition: theme.transitions.easing.easeInOut,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

const UploadBox = ({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) => {
  return (
    <StyledImage onClick={onClick ?? undefined}>
      <CloudUploadIcon fontSize={"large"} color="primary" />
      <Typography color={(theme) => theme.palette.primary.main}>
        {title}
      </Typography>
    </StyledImage>
  );
};
export default UploadBox;
