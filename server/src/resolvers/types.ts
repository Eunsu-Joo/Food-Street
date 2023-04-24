export type ResolverType = {
  [k: string]: {
    [key: string]: (
      parent: any,
      args: { [key: string]: any },
      context: { db: { [key: string]: any[] } },
      info: any
    ) => any;
  };
};
export type UserRequest = {
  email: string;
  username: string;
  jwt: string;
};
