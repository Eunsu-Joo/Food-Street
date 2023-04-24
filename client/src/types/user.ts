export type UserType = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    profile_image?: any;
    store_posts?: Array<any>;
    createdAt: string;
    updatedAt: string;
  };
};
