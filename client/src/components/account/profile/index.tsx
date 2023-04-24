import AccountLayout from "../_common/accountLayout";
import ProfileForm from "./profileForm";
import useUser from "../../../hooks/useUser";
import { Navigate } from "react-router-dom";
import PATH from "../../../constants/path";

const Profile = () => {
  const { user } = useUser();
  if (!user) return <Navigate to={PATH.HOME} />;
  return (
    <AccountLayout title={"PROFILE"}>
      <ProfileForm user={user} />
    </AccountLayout>
  );
};
export default Profile;
