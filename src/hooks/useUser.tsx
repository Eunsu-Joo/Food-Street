import { useQuery, useQueryClient } from "react-query";
import QUERY_KEYS from "../constants/querykeys";
import { clearSessionUser, getSessionUser, updateSessionUser } from "../utils/storage";
import { UserType } from "../types/user";
import { getUser } from "../utils/fetcher";

const useUser = () => {
  const queryClient = useQueryClient(); //쿼리 클라이언트 불러옴.
  const { data: user } = useQuery([QUERY_KEYS.USER], ({ signal }): Promise<UserType | null> => getUser(user), {
    initialData: getSessionUser(),
    staleTime: Infinity,
    onSuccess: (received: UserType | null) => {
      return !received ? clearSessionUser() : updateSessionUser(received);
    }
  });
  const updateUser = (newUser: UserType) => {
    queryClient.setQueryData([QUERY_KEYS.USER], newUser);
  };
  const clearUser = () => {
    queryClient.setQueryData([QUERY_KEYS.USER], null);
    queryClient.removeQueries([QUERY_KEYS.USER]);
  };

  return { user, updateUser, clearUser };
};
export default useUser;
