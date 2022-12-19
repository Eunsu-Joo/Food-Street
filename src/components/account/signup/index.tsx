import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import SignupForm from "./signupForm";
import Index from "../_common/accountLayout";
import PATH from "../../../constants/path";

const Signup = () => {
  return (
    <Index title={"Sign up"}>
      <Typography variant="body2" align="center" mb={4}>
        {"이미 가입했는데 잘못 누르셨다구요?? "}
        <Link href={PATH.LOGIN} align="center" underline="always" color={"primary"} ml={1}>
          login here
        </Link>
      </Typography>
      <SignupForm />
    </Index>
  );
};
export default Signup;
