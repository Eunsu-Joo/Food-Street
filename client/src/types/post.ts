export type PostType = {
  address: string | null;
  contents: string;
  createdAt: string;
  start_time: string | null;
  end_time: string | null;
  id: number;
  image: string | null;
  name: string;
  username: string;
  user_profile: string | null;
};

export type PostsType = PostType[];

export type PostDataType = {
  getPosts: {
    data: PostsType;
    pageCount: number;
  };
};
