import { gql } from "graphql-request";

export const SIGNUP = gql`
  mutation Signup($email: String!, $username: String!, $password: String!, $questionIndex: Int!, $questionAnswer: String!) {
    signup(email: $email, username: $username, password: $password, questionIndex: $questionIndex, questionAnswer: $questionAnswer) {
      jwt
      username
    }
  }
`;
