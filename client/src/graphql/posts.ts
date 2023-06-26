import { gql } from "graphql-request";

export const ADD_POST = gql`
  mutation AddPost($contents: String!, $name: String!, $image: String, $address: String, $startTime: String, $endTime: String, $username: String!, $user_profile: String) {
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
    }
  }
`;

export const GET_POSTS = gql`
  query Query($cursor: String) {
    getPosts(cursor: $cursor) {
      createdAt
      image
      name
      start_time
      end_time
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
    }
  }
`;
