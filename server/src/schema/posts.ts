import { gql } from "apollo-server-express";

const postsSchema = gql`
  type Post {
    image: String
    address: String
    contents: String!
    start_time: String
    end_time: String
    title: String!
    createdAt: String!
    username: String!
    user_profile: String
    id: ID!
    like: Int!
    likeUsers: [String]
    user_id: String
  }
  type PostData {
    data: [Post!]
    pageCount: Int!
  }
  type LikePost {
    count: Int!
    likeUsers: [String]
  }
  type Count {
    count: Int!
  }
  extend type Query {
    getPosts(pageParam: Int, user_id: String, filter: String): PostData
    getSearchPosts(pageParam: Int, keyword: String, filter: String): PostData
    getPost(id: ID!): Post
  }
  extend type Mutation {
    addPost(
      image: String
      address: String
      contents: String!
      start_time: String
      end_time: String
      title: String!
      username: String!
      user_profile: String
      user_id: String
    ): Post!
    likePost(id: ID!, isLike: Boolean!, jwt: ID!): LikePost!
    deletePost(id: ID!): Count!
  }
`;
export default postsSchema;
