import { HooksDefaultProps, UpdateUserInfoProps } from "../types/hooks";
import { UserType } from "../types/user";
import fetcher, { uploadImage } from "../utils/fetcher";
import getJWTHeader from "../utils/getJWTHeader";
import { useMutation, useQueryClient } from "react-query";
import QUERY_KEYS from "../constants/querykeys";
import { AxiosError } from "axios";
import { CustomErrorType } from "../types/error";
import { ObjType } from "../types";
import STATUS from "../constants/status";

const updateUserInfo = async ({ username, email, image, user }: UpdateUserInfoProps & { user: UserType }) => {
  let profile_image: any = undefined;
  if (image) {
    await uploadImage({ image, user })
      .then((data) => (profile_image = data[0]))
      .catch((error) => Promise.reject());
  }
  const { data } = await fetcher({
    url: `/users/${user.user.id}`,
    method: "put",
    data: {
      username,
      email,
      profile_image
    },
    headers: getJWTHeader(user)
  });
  return data;
};

const UseUpdateUserInfo = ({ setError }: HooksDefaultProps) => {
  const queryClient = useQueryClient();
  const { mutate: updateUser } = useMutation(
    async ({ image, username, email }: UpdateUserInfoProps) => {
      const user = queryClient.getQueryData([QUERY_KEYS.USER]) as UserType;
      return updateUserInfo({ image, username, email, user });
    },
    {
      onSuccess: async () => {
        await queryClient.refetchQueries(QUERY_KEYS.USER);
      },
      onError: (error: AxiosError<CustomErrorType>) => {
        if (!error.response) throw error;
        let message: ObjType = {};
        const { status, message: errorMsg } = error.response.data;
        //
        if (status === STATUS.BAD_REQUEST && errorMsg === "Username already taken") {
          message = {
            username: "중복된 닉네임 입니다."
          };
        }
        if (status === STATUS.BAD_REQUEST && errorMsg === "Email already taken") {
          message = {
            email: "중복된 이메일 입니다."
          };
        }
        if (status === STATUS.NOT_ALLOWED || status === STATUS.INTERVAL) {
          message = {
            email: "서버애러가 발생했습니다. 관리자에게 문의해주세요."
          };
        }
        setError({
          isError: status !== STATUS.OK,
          message
        });
      }
    }
  );
  return { updateUser };
};
export default UseUpdateUserInfo;
