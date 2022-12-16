import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import SignupForm from "./signupForm";
import LoginLayout from "../_common/LoginLayout";
import PATH from "../../../constants/path";

const Signup = () => {
  return (
    <LoginLayout title={"Sign up"}>
      <Typography variant="body2" align="center" mb={4}>
        {"이미 가입했는데 잘못 누르셨다구요?? "}
        <Link
          href={PATH.LOGIN}
          align="center"
          underline="always"
          color={"primary"}
          ml={1}
        >
          login here
        </Link>
      </Typography>
      <SignupForm />
    </LoginLayout>
  );
};
export default Signup;
