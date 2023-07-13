import { gql } from "graphql-request";

export const ADD_POST = gql`
  mutation AddPost($contents: String!, $name: String!, $image: String, $address: String, $start_time: String, $end_time: String, $username: String!, $user_profile: String) {
    addPost(contents: $contents, name: $name, image: $image, address: $address, start_time: $start_time, end_time: $end_time, username: $username, user_profile: $user_profile) {
      address
      contents
      createdAt
      end_time
      image
      name
      start_time
      username
      user_profile
      id
      like
      likeUsers
    }
  }
`;

export const GET_POSTS = gql`
  query Query($pageParam: Int, $username: String, $filter: String) {
    getPosts(pageParam: $pageParam, username: $username, filter: $filter) {
      data {
        createdAt
        name
        username
        image
        id
        user_profile
        like
        likeUsers
      }
      pageCount
    }
  }
`;

export const GET_POST = gql`
  query Query($id: ID!) {
    getPost(id: $id) {
      address
      contents
      createdAt
      end_time
      image
      name
      start_time
      like
    }
  }
`;

export const LIKE_POST = gql`
  mutation Mutation($id: ID!, $isLike: Boolean!, $jwt: ID!) {
    likePost(id: $id, isLike: $isLike, jwt: $jwt) {
      count
      likeUsers
    }
  }
`;
