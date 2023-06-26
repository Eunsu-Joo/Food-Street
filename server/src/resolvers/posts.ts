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
      return { image, address, contents, start_time, end_time, name };
    },
  },
};
export default postsResolver;
