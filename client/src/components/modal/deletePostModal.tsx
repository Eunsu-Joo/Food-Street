import ModalLayout from "./_common/ModalLayout";
import ModalDefaultProps from "./modal.interface";
import { Button, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import QUERY_KEYS from "../../constants/querykeys";
import { clearSessionUser, clearSaveUser } from "../../utils/storage";
import useUser from "../../hooks/useUser";
import fetcher from "../../graphql/fetcher";
import { DELETE_POST, REMOVE_USER } from "../../graphql/user";

type DeletePostModalProps = {
  id: number;
} & ModalDefaultProps;

const DeletePostModal = (props: DeletePostModalProps) => {
  const queryClient = useQueryClient();
  const [searchParams, _] = useSearchParams({ filter: "latest" });
  const { mutate, isSuccess, isError } = useMutation(
    () => {
      return fetcher(DELETE_POST, { id: props.id });
    },
    {
      onSuccess: async () => {
        props.onToggle();
        await queryClient.refetchQueries([QUERY_KEYS.POSTS, searchParams.get("filter")]);
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
            정말 삭제하시겠습니까?
          </Typography>
          <Button size={"large"} onClick={() => mutate()}>
            OK
          </Button>
        </>
      )}
    </ModalLayout>
  );
};
export default DeletePostModal;
