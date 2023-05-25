import { AuthType, UserType } from "../types/user";
import SESSION_KEYS from "../constants/sessionKeys";

const getSessionUser = () => {
  const userData = sessionStorage.getItem(SESSION_KEYS.USER);
  return userData ? JSON.parse(userData) : null;
};

const updateSessionUser = (user: UserType) => {
  sessionStorage.setItem(SESSION_KEYS.USER, JSON.stringify(user));
};

const clearSessionUser = () => {
  sessionStorage.removeItem(SESSION_KEYS.USER);
};
const getSessionAuth = () => {
  const authData = sessionStorage.getItem(SESSION_KEYS.AUTH);
  return authData ? JSON.parse(authData) : null;
};
const updateSessionAuth = (auth: AuthType) => {
  sessionStorage.setItem(SESSION_KEYS.AUTH, JSON.stringify(auth));
};
const clearSessionAuth = () => {
  sessionStorage.removeItem(SESSION_KEYS.AUTH);
};
export { getSessionUser, updateSessionUser, clearSessionUser, getSessionAuth, updateSessionAuth, clearSessionAuth };
