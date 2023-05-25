import { gql } from "graphql-request";

export const SIGNUP = gql`
  mutation Signup($email: String!, $username: String!, $password: String!, $questionIndex: Int!, $questionAnswer: String!, $image: String!) {
    signup(email: $email, username: $username, password: $password, questionIndex: $questionIndex, questionAnswer: $questionAnswer, image: $image) {
      jwt
      username
      image
    }
  }
`;
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
      username
      image
    }
  }
`;
export const USER = gql`
  query User($jwt: ID!) {
    user(jwt: $jwt) {
      email
      image
      password
      username
    }
  }
`;
