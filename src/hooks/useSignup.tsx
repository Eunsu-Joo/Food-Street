import fetcher from "../utils/fetcher";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios/index";
import useUser from "./useUser";
import STATUS from "../constants/status";
import type { HooksDefaultProps, ObjType, SignupUserProps, UseSignupProps } from "../types/hooks";
import type { CustomErrorType } from "../types/error";
import { UserType } from "../types/user";
import QUERY_KEYS from "../constants/querykeys";

const signupUser = async ({ email, username, password }: SignupUserProps) => {
  const { data } = await fetcher({
    url: `/auth/local/register`,
    method: "post",
    data: {
      email,
      username,
      password
    }
  });
  return data;
};

const useSignup = ({ setError }: HooksDefaultProps) => {
  const queryClient = useQueryClient();
  const { updateUser } = useUser();
  const { mutate: register, isError } = useMutation(
    ({ username, password, email }: UseSignupProps) => {
      return signupUser({
        email,
        username,
        password
      });
    },
    {
      onError: (error: AxiosError<CustomErrorType>) => {
        if (!error.response) throw error;
        let message: ObjType = {};
        const { status } = error.response.data;
        if (status === STATUS.BAD_REQUEST)
          message = {
            username: "중복된 이메일 혹은 닉네임입니다.",
            email: "중복된 이메일 혹은 닉네임입니다."
          };
        if (status === STATUS.NOT_ALLOWED || status === STATUS.INTERVAL)
          message = {
            passwordCheck: "예상치못한 애러가 발생했습니다. 관리자에게 문의해주세요."
          };
        setError({
          isError: status !== STATUS.OK,
          message
        });
      },
      onSuccess: async (data: UserType) => {
        updateUser(data);
      },
      onSettled: async () => {
        if (isError) return;
        await queryClient.refetchQueries([QUERY_KEYS.USER]);
      }
    }
  );
  return { register };
};
export default useSignup;
