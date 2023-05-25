import AccountLayout from "../_common/AccountLayout";
import ProfileForm from "./ProfileForm";
import useUser from "../../../hooks/useUser";
import { Navigate } from "react-router-dom";
import PATH from "../../../constants/path";
import { useQuery, useQueryClient } from "react-query";
import QUERY_KEYS from "../../../constants/querykeys";
import fetcher from "../../../graphql/fetcher";
import { USER } from "../../../graphql/user";
import useModal from "../../../hooks/useModal";
import Modal from "../../modal";
import Loading from "../../_common/loading";

const Profile = () => {
  const { user } = useUser();
  const { controller, isOpen } = useModal();
  const { data, isLoading } = useQuery<any>(
    [QUERY_KEYS.USER_INFO],
    () => {
      return fetcher(USER, { jwt: user.jwt });
    },
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 0,
      onError: () => {
        return controller();
      }
    }
  );
  if (isLoading) return <Loading />;
  return (
    <AccountLayout title={"PROFILE"}>
      <ProfileForm user={data.user} />
      {isOpen && <Modal onToggle={controller} isOpen={isOpen} message={"예상치 못한 애러가 발생했습니다."} />}
    </AccountLayout>
  );
};
export default Profile;
