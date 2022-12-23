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
      return getUser(user);
    },
    {
      initialData: getSessionUser(),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      onSuccess: (received: UserType | null) => {
        return !received ? clearSessionUser() : updateSessionUser(received);
      }
    }
  );

  const updateUser = (newUser: UserType) => {
    queryClient.setQueryData([QUERY_KEYS.USER], {
      jwt: null,
      user: newUser.user
    });
    updateSessionJWT(newUser.jwt);
  };

  const clearUser = () => {
    queryClient.setQueryData([QUERY_KEYS.USER], null);
    queryClient.removeQueries([QUERY_KEYS.USER]);
    sessionStorage.removeItem(QUERY_KEYS.TOKEN);
  };

  return { user, updateUser, clearUser };
};
export default useUser;
