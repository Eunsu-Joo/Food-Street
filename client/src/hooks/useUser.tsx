import { useQuery, useQueryClient } from "react-query";
import QUERY_KEYS from "../constants/querykeys";
import { clearSessionUser, getSessionUser, updateSessionJWT, updateSessionUser } from "../utils/storage";
import { UserType } from "../types/user";
import { getUser } from "../utils/fetcher";

const useUser = () => {
  const queryClient = useQueryClient(); //쿼리 클라이언트 불러옴.
  const { data: user } = useQuery(
    [QUERY_KEYS.USER],
    ({ signal }): Promise<undefined | UserType | null> => {
      const queryUser = queryClient.getQueryData([QUERY_KEYS.USER]) as UserType;
      return getUser(queryUser);
    },
    {
      initialData: getSessionUser(),
      staleTime: 1000 * 60 * 20,
      cacheTime: 1000 * 60 * 60,
      onSuccess: (received: UserType | null) => {
        return !received ? clearSessionUser() : updateSessionUser(received);
      }
    }
  );

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
