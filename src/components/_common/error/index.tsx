import { Button, Stack, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate, useSearchParams } from "react-router-dom";

const Error = () => {
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  let status = searchParams.get("status") ? parseInt(searchParams.get("status") as string) : 400;

  return (
    <Stack height={"calc(100vh - 180px)"} direction={"column"} alignItems={"center"} justifyContent={"center"}>
      <ErrorIcon sx={{ fontSize: 80 }} color={"error"} />
      <Typography fontSize={24} color={"error"} fontWeight={600} textAlign={"center"} mb={1}>
        예기치 못한 애러가 발생했습니다! <br />
        관리자에게 문의해주세요
      </Typography>
      <Typography fontWeight={600} mb={8}>
        Error Code : {status}
      </Typography>
      <Button onClick={() => navigator("/")} variant={"contained"} size={"medium"} sx={{ width: "240px" }}>
        홈으로
      </Button>
    </Stack>
  );
};
export default Error;
