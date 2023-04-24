import { UserType } from "../types/user";

const getJWTHeader = (user: UserType): Record<string, string> => {
  return { Authorization: `Bearer ${user.jwt}` };
};
export default getJWTHeader;
