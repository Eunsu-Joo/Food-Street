import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import LoginForm from "./loginForm";
import AccountLayout from "../_common/accountLayout";
import PATH from "../../../constants/path";

const Login = () => {
  return (
    <AccountLayout title={"Login"}>
      <Typography variant="body2" align="center" mb={4}>
        {"아직 가입을 안하셨다구요?? "}
        <Link to={PATH.SIGNUP}>
          <Typography component={"span"} color={"primary"} sx={{ textDecoration: "underline" }}>
            signup here
          </Typography>
        </Link>
      </Typography>
      <LoginForm />
      {/*<Typography variant="body2" align="center" mt={2}>*/}
      {/*  {"비밀번호를 잊으셨나요?? "}*/}
      {/*  <Link to={PATH.FORGOT_PW}>*/}
      {/*    <Typography component={"span"} color={"primary"} sx={{ textDecoration: "underline" }}>*/}
      {/*      forgot password*/}
      {/*    </Typography>*/}
      {/*  </Link>*/}
      {/*</Typography>*/}
    </AccountLayout>
  );
};
export default Login;
