export type PostType = {
  address: string | null;
  contents: string;
  createdAt: string;
  start_time: string;
  end_time: string;
  id: number;
  image: string | null;
  title: string;
  username: string;
  user_profile: string | null;
  like: number;
  likeUsers: string[];
  user_id: string;
  place_name: string | null;
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
