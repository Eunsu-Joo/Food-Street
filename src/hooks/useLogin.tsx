import fetcher from "../utils/fetcher";
import { useMutation } from "react-query";
import { AxiosError } from "axios/index";
import { CustomErrorType } from "../types/error";
import STATUS from "../constants/status";
import useUser from "./useUser";
import type { UserType } from "../types/user";
import type { HooksDefaultProps, ObjType, LoginUserProps } from "../types/hooks";

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
  const { updateUser } = useUser();
  const { mutate: login } = useMutation(({ identifier, password }: LoginUserProps) => loginUser({ identifier, password }), {
    onError: (error: AxiosError<CustomErrorType>) => {
      if (!error.response) throw error;
      let message: ObjType = {};
      const { status, message: errMsg, details } = error.response.data;
      if (details?.identifier) message["identifier"] = errMsg;
      if (details?.password) message["password"] = errMsg;
      if (status === STATUS.NOT_ALLOWED || status === STATUS.INTERVAL) message["password"] = "애러가 발생했습니다. 관리자에게 문의해주세요.";
      setError({
        isError: error.response.data.status !== 200,
        message
      });
    },
    onSuccess: async (data: UserType) => {
      updateUser(data);
    }
  });
  return { login };
};
export default useLogin;
