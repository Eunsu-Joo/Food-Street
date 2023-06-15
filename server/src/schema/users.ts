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
  type Password {
    password: String!
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
    changePw(jwt: ID!, newPassword: String!, password: String!): Update
    remove(jwt: ID!): Update
    forgotPw(
      email: String!
      questionIndex: Int!
      questionAnswer: String!
    ): Password
  }
`;
export default usersSchema;
