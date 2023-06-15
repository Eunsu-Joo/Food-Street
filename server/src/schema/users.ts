import { gql } from "apollo-server-express";

const usersSchema = gql`
  type User {
    image: String
    email: String!
    username: String!
    jwt: ID!
    questionIndex: Int!
    questionAnswer: String!
  }
  type Update {
    count: Int!
  }
  extend type Query {
    user(jwt: ID!): User
    login(email: String!, password: String!): User!
  }
  extend type Mutation {
    signup(
      email: String!
      username: String!
      password: String!
      questionIndex: Int
      questionAnswer: String!
      image: String
    ): User!
    update(
      jwt: ID!
      email: String!
      username: String!
      questionIndex: Int!
      questionAnswer: String!
      image: String
    ): User!
    resetPassword(jwt: ID!, password: String!): Update
    remove(jwt: ID!): Update
  }
`;
export default usersSchema;
