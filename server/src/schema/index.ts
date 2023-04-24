import { gql } from "apollo-server-express";
import postsSchema from "./posts";
import usersSchema from "./users";
/* 🚀 Schema
   -  타입정의.
   -  서버와 주고받는  데이터의 타입을 정의.
* **/
const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;
export default [linkSchema, postsSchema, usersSchema];
