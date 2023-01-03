import { Button, Stack, Typography } from "@mui/material";
import NoPosts from "../../../../images/noPosts.png";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../constants/path";

const NoResult = () => {
  const navigator = useNavigate();
  return (
    <Stack minHeight={"50vh"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
      <img src={NoPosts} alt="" width={200} height={200} />
      <Typography fontSize={24} mb={2} fontWeight={700}>
        포스트가 없습니다.
      </Typography>
      <Button onClick={() => navigator(PATH.ADD_POST)} variant={"contained"}>
        글쓰기
      </Button>
    </Stack>
  );
};
export default NoResult;
