import type { User } from "../types/user";
import { useQuery, useQueryClient } from "react-query";
import QUERY_KEYS from "../constants/querykeys";

import {
  getSessionUser,
  updateSessionUser,
  clearSessionUser,
} from "../utils/storage";
import { getUser } from "../utils/httpModules";
import { AxiosResponse } from "axios";

type UserType = User | null;

interface UseUser {
  user: UserType;
}

const default_data: User = {
  id: 1,
  username: "Eunsu",
  email: "holicholicpop@gmail.com",
  provider: "local",
  confirmed: true,
  blocked: false,
  createdAt: "2022-12-05T07:34:40.091Z",
  updatedAt: "2022-12-05T07:34:40.091Z",
};
const getUserData = async (user: UserType) => {
  if (!user) return null;
  const { data }: AxiosResponse<User> = await getUser(user.id);
  return data;
};

const useUser = (): UseUser => {
  const queryClient = useQueryClient();
  const { data: user } = useQuery(
    [QUERY_KEYS.USER],
    ({ signal }): Promise<UserType> => getUserData(user),
    {
      initialData: getSessionUser(),
      onSuccess: (received) => {
        return !received ? clearSessionUser() : updateSessionUser(received);
      },
    }
  );

  const updateUser = (newData: User) => {
    queryClient.setQueryData(QUERY_KEYS.USER, newData);
  };

  const clearUser = () => {
    queryClient.setQueryData(QUERY_KEYS.USER, null);
    queryClient.removeQueries(QUERY_KEYS.USER);
  };

  return { user };
};
export default useUser;
