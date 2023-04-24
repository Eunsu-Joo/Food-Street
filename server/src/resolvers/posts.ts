import { ResolverType } from "./types";

const postsResolver: ResolverType = {
  Query: {
    getPosts: (parent, { cursor = "" }, { db }, info) => {
      return [];
    },
  },
  Mutation: {},
};
export default postsResolver;
