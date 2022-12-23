import fetcher, { getUser, uploadImage } from "../utils/fetcher";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios/index";
import useUser from "./useUser";
import STATUS from "../constants/status";
import type { ObjType, SignupUserProps, UseSignupProps } from "../types/hooks";
import type { CustomErrorType } from "../types/error";
import { UserType } from "../types/user";

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

const useSignup = ({ setError, username, password, email }: UseSignupProps) => {
  const { updateUser } = useUser();
  const { mutate: register } = useMutation(
    () => {
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
        if (error.response.data.status === STATUS.BAD_REQUEST) message["email"] = "이미 존재하는 이메일 / 닉네임 입니다.";
        if (error.response.data.status === STATUS.NOT_ALLOWED || error.response.data.status === STATUS.INTERVAL) message["passwordCheck"] = "서버애러가 발생했습니다. 관리자에게 문의해주세요.";
        setError({
          isError: error.response.data.status !== 200,
          message
        });
      },
      onSuccess: async (data: UserType) => {
        const jwt = data.jwt;
        const newUser = await getUser(data);
        if (!newUser)
          setError({
            isError: true,
            message: {
              passwordCheck: "예상치못한 애러가 발생했습니다."
            }
          });
        updateUser({
          jwt,
          user: newUser.user
        });
      }
    }
  );
  return { register };
};
export default useSignup;
