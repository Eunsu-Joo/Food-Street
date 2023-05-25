import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PATH from "../../../constants/path";
import AccountLayout from "../_common/AccountLayout";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <AccountLayout title={"Sign up"}>
      <Typography variant="body2" align="center" mb={4}>
        {"이미 가입했는데 잘못 누르셨다구요?? "}
        <Link to={PATH.LOGIN}>
          <Typography component={"span"} color={"primary"} sx={{ textDecoration: "underline" }}>
            login here
          </Typography>
        </Link>
      </Typography>
      <SignupForm />
    </AccountLayout>
  );
};
export default Signup;
