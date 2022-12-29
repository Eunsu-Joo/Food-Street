import { ChangePasswordProps, HooksDefaultProps } from "../types/hooks";
import getJWTHeader from "../utils/getJWTHeader";
import fetcher from "../utils/fetcher";
import { useMutation, useQueryClient } from "react-query";
import { UserType } from "../types/user";
import QUERY_KEYS from "../constants/querykeys";
import { ObjType } from "../types";
import STATUS from "../constants/status";
import { AxiosError } from "axios";
import { CustomErrorType } from "../types/error";
import useUser from "./useUser";

export const changePassword = async (props: ChangePasswordProps & { user: UserType }) => {
  const { user, ...rest } = props;
  const { data } = await fetcher({
    url: `/auth/change-password`,
    method: "post",
    headers: getJWTHeader(props.user),
    data: rest
  });
  return data;
};

const useChangePassword = ({ setError, onSuccess }: HooksDefaultProps & { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  const { mutate: changeUserPassword } = useMutation(
    (props: ChangePasswordProps) => {
      const user = queryClient.getQueryData(QUERY_KEYS.USER) as UserType;
      return changePassword({ ...props, user });
    },
    {
      onError: (error: AxiosError<CustomErrorType>) => {
        if (!error.response) throw error;
        let message: ObjType = {};
        const { status, message: errorMsg } = error.response.data;
        if (errorMsg === "The provided current password is invalid") message = { currentPassword: "현재 비밀번호가 일치하지 않습니다." };
        if (errorMsg === "Your new password must be different than your current password") message = { password: "이전 비밀번호와 다른 비밀번호를 설정해주세요." };
        setError({
          isError: status !== STATUS.OK,
          message
        });
      },
      onSuccess: async () => {
        onSuccess();
      }
    }
  );
  return { changeUserPassword };
};
export default useChangePassword;
