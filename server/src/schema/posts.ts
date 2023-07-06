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
  }
  type PostData {
    data: [Post!]
    pageCount: Int!
  }
  type Like {
    count: Int!
  }
  extend type Query {
    getPosts(pageParam: Int): PostData
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
    likePost(id: ID!, isLike: Boolean!): Like!
  }
`;
export default postsSchema;
