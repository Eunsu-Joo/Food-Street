import { ResolverType } from "./types";
import { DBFile, writeDB } from "../dbController";
const setJSON = (data: any[]) => writeDB(DBFile.POSTS, data);

const postsResolver: ResolverType = {
  Query: {
    getPosts: (parent, { cursor = "" }, { db }) => {
      return [];
    },
    getPost: (parent, { id = 1 }, { db }) => {
      return null;
    },
  },
  Mutation: {
    addPost: (
      _,
      { image, address, contents, start_time, end_time, name },
      { db }
    ) => {
      const createdAt = new Date().toISOString();
      return {
        image,
        address,
        contents,
        start_time,
        end_time,
        name,
        createdAt,
      };
    },
  },
};
export default postsResolver;
