interface UserDataType {
  id: number;
  username: string;
  email: string;
  provider: string;
  profile_image: null | string;
  store_posts: Array<any>;
  createdAt: string;
  updatedAt: string;
}
export type UserType = {
  jwt: string;
  user: UserDataType;
};
