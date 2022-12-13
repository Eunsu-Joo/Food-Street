import Link from "@mui/material/Link";
import { Typography } from "@mui/material";

import LoginForm from "./LoginForm";
import LoginLayout from "../_common/LoginLayout";
import Modal from "../../modal";

const Login = () => {
  return (
    <LoginLayout title={"Login"}>
      <Typography variant="body2" align="center" mb={4}>
        {"아직 가입을 안하셨다구요?? "}
        <Link
          href="/sign_up"
          align="center"
          underline="always"
          color={"primary"}
        >
          Sign Up here
        </Link>
      </Typography>
      <LoginForm />
      <Typography variant="body2" align="center" mt={2}>
        {"비밀번호를 잊으셨나요?? "}
        <Link
          href="/forgot_password"
          align="center"
          underline="always"
          color={"primary"}
        >
          Forgot your password
        </Link>
      </Typography>
    </LoginLayout>
  );
};
export default Login;
