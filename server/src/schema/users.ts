import { gql } from "apollo-server-express";

const usersSchema = gql`
  type Result {
    email: String!
    username: String!
    jwt: ID!
    image: String
  }
  type User {
    image: String
    email: String!
    username: String!
    password: String!
  }
  extend type Query {
    user(jwt: ID!): User
  }
  extend type Mutation {
    login(email: String!, password: String!): Result!
  }
  extend type Mutation {
    signup(
      email: String!
      username: String!
      password: String!
      questionIndex: Int!
      questionAnswer: String!
      image: String
    ): Result!
  }
`;
export default usersSchema;
