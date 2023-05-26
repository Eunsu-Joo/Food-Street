import { ResolverType, UserRequest } from "./types";
import { DBFile, writeDB } from "../dbController";
import { v4 as uuid } from "uuid";
import { GraphQLError } from "graphql/error";
const setJSON = (data: any[]) => writeDB(DBFile.USERS, data);
const usersResolver: ResolverType = {
  Query: {
    user: (_, { jwt }, { db }) => {
      const target = db.users.find((data) => data.jwt === jwt);
      if (!target) throw new GraphQLError("해당 유저를 찾을 수 없습니다.");
      return {
        image: target.image,
        email: target.email,
        username: target.username,
        password: target.password,
        jwt,
      };
    },
  },
  Mutation: {
    signup: (
      _,
      { email, password, username, questionIndex, questionAnswer, image },
      { db }
    ) => {
      const duplicatedUsername = db.users.find(
        (item) => item.username === username
      );
      if (!!duplicatedUsername)
        throw new GraphQLError("중복된 닉네임 입니다.", {
          extensions: { code: "BAD_REQUEST" },
        });
      const duplicatedEmail = db.users.find((item) => item.email === email);
      if (!!duplicatedEmail)
        throw new GraphQLError("중복된 이메일 입니다.", {
          extensions: { code: "BAD_REQUEST" },
        });
      const jwt = uuid();
      const newUser = {
        email,
        password,
        username,
        jwt,
        questionIndex,
        questionAnswer,
        image,
      };
      db.users.push(newUser);
      setJSON(db.users);
      return { email, username, jwt, image };
    },
    login: (parent, { email, password }, { db }) => {
      const target = db.users.find((item) => item.email === email);
      if (!target) throw new GraphQLError("해당 유저를 찾을 수 없습니다.");
      if (target.password !== password)
        throw new GraphQLError("비밀번호가 일치하지 않습니다.");
      const user = {
        jwt: target.jwt,
        email: target.email,
        username: target.username,
        image: target.image,
      };
      return user;
    },
  },
};
export default usersResolver;
