import { gql } from "apollo-server-express";

const usersSchema = gql`
  type Result {
    email: String!
    username: String!
    jwt: String!
  }
  extend type Query {
    login(email: String!, password: String!): Result!
  }
  extend type Mutation {
    signup(
      email: String!
      username: String!
      password: String!
      questionIndex: Int!
      questionAnswer: String!
    ): Result!
  }
`;
export default usersSchema;
