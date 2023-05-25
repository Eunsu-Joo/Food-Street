import { Link, Navigate } from "react-router-dom";
import { Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import AccountLayout from "../_common/AccountLayout";
import PATH from "../../../constants/path";
import { useEffect, useState } from "react";
import SESSION_KEYS from "../../../constants/sessionKeys";
import useUser from "../../../hooks/useUser";
export type LoginInputType = {
  email: string;
  password: string;
};
const Login = () => {
  const [defaultValues, setDefaultValues] = useState<LoginInputType>({
    email: "",
    password: ""
  });
  const { user } = useUser();

  useEffect(() => {
    setDefaultValues((prev) => {
      return sessionStorage.getItem(SESSION_KEYS.AUTH) ? JSON.parse(sessionStorage.getItem(SESSION_KEYS.AUTH) as string) : prev;
    });
  }, []);
  if (user) return <Navigate to={PATH.HOME} />;
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
      <LoginForm defaultValues={defaultValues} setDefaultValues={setDefaultValues} />
      <Typography variant="body2" align="center" mt={2}>
        {"비밀번호를 잊으셨나요?? "}
        <Link to={PATH.FORGOT_PW}>
          <Typography component={"span"} color={"primary"} sx={{ textDecoration: "underline" }}>
            forgot password
          </Typography>
        </Link>
      </Typography>
    </AccountLayout>
  );
};
export default Login;
