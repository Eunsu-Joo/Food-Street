import QUERY_KEYS from "../constants/querykeys";
import { UserType } from "../types/user";

const getSessionUser = () => {
  const userData = sessionStorage.getItem(QUERY_KEYS.USER);
  return userData ? JSON.parse(userData) : null;
};

const updateSessionUser = (user: UserType) => {
  sessionStorage.setItem(QUERY_KEYS.USER, JSON.stringify(user));
};
const updateSessionJWT = (token: string) => {
  sessionStorage.setItem(QUERY_KEYS.TOKEN, token);
};
const clearSessionUser = () => {
  sessionStorage.removeItem(QUERY_KEYS.USER);
  sessionStorage.removeItem(QUERY_KEYS.TOKEN);
};
export { getSessionUser, updateSessionUser, clearSessionUser, updateSessionJWT };
