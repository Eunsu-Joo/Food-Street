import { gql } from "apollo-server-express";

const postsSchema = gql`
  type Post {
    image: String
    address: String
    contents: String!
    start_time: String
    end_time: String
    name: String!
    createdAt: String!
  }
  extend type Query {
    getPosts(cursor: String): [Post!]
    getPost(id: ID!): Post!
  }
  extend type Mutation {
    addPost(
      image: String
      address: String
      contents: String!
      start_time: String
      end_time: String
      name: String!
    ): Post!
  }
`;
export default postsSchema;
