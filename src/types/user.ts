interface CreatedDateType {
  createdAt: string;
  updatedAt: string;
}

export interface User extends CreatedDateType {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
}
export type UserType = {
  jwt: string;
  user: User;
};
