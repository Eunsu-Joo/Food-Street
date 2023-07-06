import { ResolverType } from "./types";
import { DBFile, writeDB } from "../dbController";
import { GraphQLError } from "graphql/error";
const setJSON = (data: any[]) => writeDB(DBFile.POSTS, data);
const PAGE_LIMIT = 9;
const postsResolver: ResolverType = {
  Query: {
    getPosts: (parent, { pageParam }, { db }) => {
      const data = db.posts;
      return {
        data:
          data.slice((pageParam - 1) * PAGE_LIMIT, pageParam * PAGE_LIMIT) ||
          [],
        pageCount:
          data.length < PAGE_LIMIT ? 1 : Math.ceil(data.length / PAGE_LIMIT),
      };
    },
    getPost: (parent, { id = 1 }, { db }) => {
      return null;
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
      };
      let id = 0;
      if (db.posts.length > 0) id = db.posts[db.posts.length - 1].id + 1;
      db.posts.push({ ...postData, id });
      setJSON(db.posts);
      return { ...postData, id };
    },
    likePost: (_, { id, isLike }, { db }) => {
      const target = db.posts.find((item) => item.id === +id),
        targetIndex = db.posts.indexOf(target);
      if (!target) throw new GraphQLError("해당유저를 찾을 수 없습니다.");
      let newItem = { ...target };
      if (isLike) newItem = { ...newItem, like: newItem.like + 1 };
      else
        newItem = { ...newItem, like: target.like === 0 ? 0 : target.like - 1 };
      db.posts.splice(targetIndex, 1, newItem);
      setJSON(db.posts);
      return { count: newItem.like };
    },
  },
};
export default postsResolver;
