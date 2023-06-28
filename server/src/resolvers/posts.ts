import { ResolverType } from "./types";
import { DBFile, writeDB } from "../dbController";
const setJSON = (data: any[]) => writeDB(DBFile.POSTS, data);

const postsResolver: ResolverType = {
  Query: {
    getPosts: (parent, { pageParam }, { db }) => {
      const fromIndex = (pageParam - 1) * 10,
        endIndex = pageParam * 10;
      return db.posts.slice(fromIndex, endIndex) || [];
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
  },
};
export default postsResolver;
