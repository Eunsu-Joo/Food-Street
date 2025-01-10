import { gql } from "graphql-request";

export const ADD_POST = gql`
  mutation AddPost($contents: String!, $title: String!, $image: String, $address: String, $start_time: String, $end_time: String, $username: String!, $user_profile: String, $user_id: String!, $place_name: String) {
    addPost(contents: $contents, title: $title, image: $image, address: $address, start_time: $start_time, end_time: $end_time, username: $username, user_profile: $user_profile, user_id: $user_id, place_name: $place_name) {
      count
    }
  }
`;
export const EDIT_POST = gql`
  mutation EditPost($contents: String!, $title: String!, $image: String, $address: String, $start_time: String, $end_time: String, $place_name: String, $id: ID!) {
    editPost(contents: $contents, title: $title, image: $image, address: $address, start_time: $start_time, end_time: $end_time, place_name: $place_name, id: $id) {
      count
    }
  }
`;
export const GET_POSTS = gql`
  query Query($pageParam: Int, $user_id: String, $filter: String) {
    getPosts(pageParam: $pageParam, user_id: $user_id, filter: $filter) {
      data {
        createdAt
        title
        username
        image
        id
        user_profile
        like
        likeUsers
        address
        contents
        end_time
        start_time
        user_id
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
      end_time
      image
      title
      start_time
      id
      place_name
    }
  }
`;
export const GET_SEARCH_POSTS = gql`
  query Query($pageParam: Int, $keyword: String, $filter: String) {
    getSearchPosts(pageParam: $pageParam, keyword: $keyword, filter: $filter) {
      data {
        createdAt
        title
        username
        image
        id
        user_profile
        like
        likeUsers
        address
        contents
        end_time
        start_time
        user_id
      }
      pageCount
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
