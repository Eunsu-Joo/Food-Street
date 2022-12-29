import { AddPostProps, HooksDefaultProps } from "../types/hooks";
import fetcher from "../utils/fetcher";
import getJWTHeader from "../utils/getJWTHeader";
import { useMutation } from "react-query";

const addPost = async (props: AddPostProps) => {
  const { user, ...rest } = props;
  const { data } = await fetcher({
    url: "/store-posts",
    method: "post",
    data: {
      data: rest
    },
    params: {
      populate: "*"
    },
    headers: getJWTHeader(user)
  });
  return data;
};
const useAddPost = ({ setError }: HooksDefaultProps) => {
  const { mutate: updatePost } = useMutation(
    (props: AddPostProps) => {
      return addPost(props);
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: () => {}
    }
  );
  return { updatePost };
};
export default useAddPost;
