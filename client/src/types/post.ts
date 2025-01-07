export type PostType = {
  address: string | null;
  contents: string;
  createdAt: string;
  start_time: string | null;
  end_time: string | null;
  id: number;
  image: string | null;
  title: string;
  username: string;
  user_profile: string | null;
  like: number;
  likeUsers: string[];
  user_id: string;
};

export type PostsType = PostType[];

export type PostDataType = {
  getPosts: {
    data: PostsType;
    pageCount: number;
  };
};
export type SearchDataType = {
  getSearchPosts: {
    data: PostsType;
    pageCount: number;
  };
};
