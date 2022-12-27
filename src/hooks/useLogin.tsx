import fetcher from "../utils/fetcher";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios/index";
import { CustomErrorType } from "../types/error";
import STATUS from "../constants/status";
import useUser from "./useUser";
import type { UserType } from "../types/user";
import type { HooksDefaultProps, ObjType, LoginUserProps } from "../types/hooks";
import QUERY_KEYS from "../constants/querykeys";

const loginUser = async ({ identifier, password }: LoginUserProps) => {
  const { data } = await fetcher({
    url: `/auth/local`,
    method: "post",
    data: {
      identifier,
      password
    }
  });
  return data;
};

const useLogin = ({ setError }: HooksDefaultProps) => {
  const queryClient = useQueryClient();
  const { updateUser } = useUser();
  const { mutate: login, isError } = useMutation(({ identifier, password }: LoginUserProps) => loginUser({ identifier, password }), {
    onError: (error: AxiosError<CustomErrorType>) => {
      if (!error.response) throw error;
      let message: ObjType = {};
      const { status } = error.response.data;
      if (status === STATUS.BAD_REQUEST) message = { password: "이메일과 비밀번호를 다시 확인해주세요." };
      if (status === STATUS.NOT_ALLOWED || status === STATUS.INTERVAL) message = { password: "예상치못한 문제가 발생했습니다. 관리자에게 문의해주세요." };
      setError({
        isError: status !== STATUS.OK,
        message
      });
    },
    onSuccess: async (data: UserType) => {
      updateUser(data); //데이터 업데이트
    },
    onSettled: async () => {
      if (isError) return;
      await queryClient.refetchQueries([QUERY_KEYS.USER]);
    }
  });
  return { login };
};
export default useLogin;
