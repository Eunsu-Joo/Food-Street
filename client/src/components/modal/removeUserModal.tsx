import ModalLayout from "./_common/ModalLayout";
import ModalDefaultProps from "./modal.interface";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import QUERY_KEYS from "../../constants/querykeys";
import { clearSessionUser, clearSaveUser } from "../../utils/storage";
import useUser from "../../hooks/useUser";
import fetcher from "../../graphql/fetcher";
import { REMOVE_USER } from "../../graphql/user";

const RemoveUserModal = (props: ModalDefaultProps) => {
  const navigator = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useUser();
  const { mutate, isSuccess, isError } = useMutation(
    () => {
      return fetcher(REMOVE_USER, { jwt: data.user.jwt });
    },
    {
      onSuccess: () => {
        queryClient.removeQueries([QUERY_KEYS.USER]);
        clearSessionUser();
        clearSaveUser();
        props.onToggle();
        navigator("/");
      }
    }
  );

  return (
    <ModalLayout {...props}>
      {isError ? (
        <>
          <Typography component={"p"} fontWeight={600} fontSize={20} marginBottom={1.5}>
            애러가 발생했습니다.
          </Typography>
        </>
      ) : (
        <>
          <Typography component={"p"} fontWeight={600} fontSize={20} marginBottom={1.5}>
            정말 탈퇴하시겠습니까?
          </Typography>
          <Button size={"large"} onClick={() => mutate()}>
            OK
          </Button>
        </>
      )}
    </ModalLayout>
  );
};
export default RemoveUserModal;
