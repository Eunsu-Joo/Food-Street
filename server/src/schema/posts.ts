import { gql } from "apollo-server-express";

const postsSchema = gql`
  type Post {
    id: ID!
    title: String!
    username: String!
    contents: String!
    userProfile: String!
    imageURL: String!
    createdAt: String!
  }
  extend type Query {
    getPosts(cursor: String): [Post!]
  }
`;
export default postsSchema;
