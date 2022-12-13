import QUERY_KEYS from "../constants/querykeys";
import { User } from "../types/user";

const getSessionUser = () => {
  const userData = sessionStorage.getItem(QUERY_KEYS.USER);
  return userData ? JSON.parse(userData) : null;
};
const updateSessionUser = (user: User) => {
  sessionStorage.setItem(QUERY_KEYS.USER, JSON.stringify(user));
};
const clearSessionUser = () => {
  sessionStorage.removeItem(QUERY_KEYS.USER);
};
export { getSessionUser, updateSessionUser, clearSessionUser };
