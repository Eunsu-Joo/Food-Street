import { gql } from "graphql-request";

export const SIGNUP = gql`
  mutation Signup($email: String!, $username: String!, $password: String!, $questionIndex: Int!, $questionAnswer: String!, $image: String) {
    signup(email: $email, username: $username, password: $password, questionIndex: $questionIndex, questionAnswer: $questionAnswer, image: $image) {
      image
      email
      username
      jwt
      questionIndex
      questionAnswer
    }
  }
`;
export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      image
      email
      username
      jwt
      questionIndex
      questionAnswer
    }
  }
`;
export const USER = gql`
  query User($jwt: ID!) {
    user(jwt: $jwt) {
      image
      email
      username
      jwt
      questionIndex
      questionAnswer
    }
  }
`;
export const UPDATE_USER = gql`
  mutation Mutation($jwt: ID!, $email: String!, $username: String!, $questionIndex: Int!, $questionAnswer: String!, $image: String) {
    update(jwt: $jwt, email: $email, username: $username, questionIndex: $questionIndex, questionAnswer: $questionAnswer, image: $image) {
      email
      image
      jwt
      questionAnswer
      questionIndex
      username
    }
  }
`;
export const CHANGE_PASSWORD = gql`
  mutation ChangePw($jwt: ID!, $newPassword: String!, $password: String!) {
    changePw(jwt: $jwt, newPassword: $newPassword, password: $password) {
      count
    }
  }
`;
export const REMOVE_USER = gql`
  mutation Mutation($jwt: ID!) {
    remove(jwt: $jwt) {
      count
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation Mutation($email: String!, $questionIndex: Int!, $questionAnswer: String!) {
    forgotPw(email: $email, questionIndex: $questionIndex, questionAnswer: $questionAnswer) {
      password
    }
  }
`;
