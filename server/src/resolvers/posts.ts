import { ResolverType } from "./types";
import { DBFile, writeDB } from "../dbController";
import { GraphQLError } from "graphql/error";

const setJSON = (data: any[]) => writeDB(DBFile.POSTS, data);
const PAGE_LIMIT = 9;
const postsResolver: ResolverType = {
  Query: {
    getPosts: (parent, { pageParam, username, filter }, { db }) => {
      let data = db.posts;
      if (username) data = data.filter((post) => post.user_id === username);
      if (filter === "latest") data = data.sort((a, b) => b.id - a.id);
      if (filter === "popular") data = data.sort((a, b) => b.like - a.like);
      if (filter === "order")
        data = data.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1; // 내림차순 정렬
          return 0;
        });

      return {
        data:
          data.slice((pageParam - 1) * PAGE_LIMIT, pageParam * PAGE_LIMIT) ||
          [],
        pageCount:
          data.length < PAGE_LIMIT ? 1 : Math.ceil(data.length / PAGE_LIMIT),
      };
    },
    getSearchPosts: (parent, { pageParam, keyword, filter }, { db }) => {
      let data = db.posts.filter((post) => {
        return post.name.includes(keyword);
      });

      if (filter === "latest") data = data.sort((a, b) => b.id - a.id);
      if (filter === "popular") data = data.sort((a, b) => b.like - a.like);
      if (filter === "order")
        data = data.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1; // 내림차순 정렬
          return 0;
        });
      console.log({
        data:
          data.slice((pageParam - 1) * PAGE_LIMIT, pageParam * PAGE_LIMIT) ||
          [],
        pageCount:
          data.length < PAGE_LIMIT ? 1 : Math.ceil(data.length / PAGE_LIMIT),
      });
      return {
        data:
          data.slice((pageParam - 1) * PAGE_LIMIT, pageParam * PAGE_LIMIT) ||
          [],
        pageCount:
          data.length < PAGE_LIMIT ? 1 : Math.ceil(data.length / PAGE_LIMIT),
      };
    },
  },
  Mutation: {
    addPost: (
      _,
      {
        image,
        address,
        contents,
        start_time,
        end_time,
        name,
        username,
        user_profile,
        user_id,
      },
      { db }
    ) => {
      const postData = {
        image: image ?? null,
        address: address ?? null,
        contents,
        start_time: start_time ?? null,
        end_time: end_time ?? null,
        name,
        username,
        user_profile,
        createdAt: new Date().toISOString(),
        user_id,
        like: 0,
        likeUsers: [],
      };

      const newItem = {
        ...postData,
        id: db.posts.length > 0 ? +db.posts[0].id + 1 : 0,
      };

      db.posts.unshift(newItem);
      setJSON(db.posts);
      return newItem;
    },
    likePost: (_, { id, isLike, jwt }, { db }) => {
      const target = db.posts.find((item) => item.id === +id),
        targetIndex = db.posts.indexOf(target);
      if (!target) throw new GraphQLError("해당유저를 찾을 수 없습니다.");
      let newItem = { ...target };
      if (isLike)
        newItem = {
          ...newItem,
          like: newItem.like + 1,
          likeUsers: [...target.likeUsers, jwt],
        };
      else
        newItem = {
          ...newItem,
          like: target.like === 0 ? 0 : target.like - 1,
          likeUsers: target.likeUsers.filter((user: string) => user !== jwt),
        };
      db.posts.splice(targetIndex, 1, newItem);
      setJSON(db.posts);
      return { count: newItem.like, likeUsers: newItem.likeUsers };
    },
    deletePost: (_, { id }, { db }) => {
      const existIndex = db.posts.findIndex((item) => item.id === +id);
      if (existIndex < 0)
        throw new GraphQLError("존재하지 않는 게시물 입니다.");
      db.posts.splice(existIndex, 1);
      setJSON(db.posts);
      return { count: 1 };
    },
  },
};
export default postsResolver;
