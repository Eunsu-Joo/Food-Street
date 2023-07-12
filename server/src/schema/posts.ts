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
    username: String!
    user_profile: String
    id: ID!
    like: Int!
    likeUsers: [String]
  }
  type PostData {
    data: [Post!]
    pageCount: Int!
  }
  type Count {
    count: Int!
  }
  extend type Query {
    getPosts(pageParam: Int, username: String, filter: String): PostData
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
      username: String!
      user_profile: String
    ): Post!
    likePost(id: ID!, isLike: Boolean!, jwt: ID!): Count!
    deletePost(id: ID!): Count
  }
`;
export default postsSchema;
