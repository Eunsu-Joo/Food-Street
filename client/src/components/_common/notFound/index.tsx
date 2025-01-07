import { useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import NoPosts from "../../../images/noPosts.png";
import PATH from "../../../constants/path";

const NotFound = () => {
  const navigator = useNavigate();
  return (
    <Stack minHeight={"50vh"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
      <img src={NoPosts} alt="" width={200} height={200} />
      <Typography fontSize={24} mb={2} fontWeight={700}>
        해당 페이지를 찾을 수 없습니다.
      </Typography>
      <Button onClick={() => navigator(PATH.HOME)} variant={"contained"}>
        홈으로
      </Button>
    </Stack>
  );
};
export default NotFound;
