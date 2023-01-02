import { AddPostProps, HooksDefaultProps } from "../types/hooks";
import fetcher, { uploadImage } from "../utils/fetcher";
import getJWTHeader from "../utils/getJWTHeader";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { CustomErrorType } from "../types/error";
import { ObjType } from "../types";
import STATUS from "../constants/status";
import QUERY_KEYS from "../constants/querykeys";

const addPost = async (props: AddPostProps) => {
  let { user, image, ...rest } = props;
  if (image) {
    if (image) {
      await uploadImage({ image, user })
        .then((data) => (image = data[0]))
        .catch((error) => Promise.reject());
    }
  }
  const { data } = await fetcher({
    url: "/store-posts",
    method: "post",
    data: {
      data: {
        ...rest,
        image,
        users_permissions_user: user.user
      }
    },
    params: {
      populate: {
        0: "users_permissions_user",
        1: "image"
      }
    },
    headers: getJWTHeader(user)
  });
  return data;
};
const useAddPost = ({ setError, onSuccess }: HooksDefaultProps & { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  const { mutate: updatePost } = useMutation(
    (props: AddPostProps) => {
      return addPost(props);
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData([QUERY_KEYS.DETAIL_POST, data.data.id], data);
        onSuccess();
      },
      onError: (error: AxiosError<CustomErrorType>) => {
        if (!error.response) throw error;
        let message: ObjType = {};
        const { status } = error.response.data;
        //
        if (status === STATUS.BAD_REQUEST) {
          message = {
            username: "중복된 닉네임 입니다."
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
  return { updatePost };
};
export default useAddPost;
