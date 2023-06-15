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
      const { password: pw, ...rest } = target;
      return rest;
    },
    login: (parent, { email, password }, { db }) => {
      const target = db.users.find((item) => item.email === email);
      if (!target) throw new GraphQLError("해당 유저를 찾을 수 없습니다.");
      if (target.password !== password)
        throw new GraphQLError("비밀번호가 일치하지 않습니다.");
      const { password: pw, ...rest } = target;
      return rest;
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
      const { password: pw, ...rest } = newUser;
      return rest;
    },
    update: (_, { jwt, ...rest }, { db }) => {
      const target = db.users.find((data) => data.jwt === jwt);
      if (!target) throw new GraphQLError("해당 유저를 찾을 수 없습니다.");
      const { username, email } = rest;
      const duplicatedUsername = db.users
        .filter((user) => user.jwt !== jwt)
        .find((item) => item.username === username);
      if (!!duplicatedUsername)
        throw new GraphQLError("중복된 닉네임 입니다.", {
          extensions: { code: "BAD_REQUEST" },
        });
      const duplicatedEmail = db.users
        .filter((user) => user.jwt !== jwt)
        .find((item) => item.email === email);
      if (!!duplicatedEmail)
        throw new GraphQLError("중복된 이메일 입니다.", {
          extensions: { code: "BAD_REQUEST" },
        });
      const newItem = { ...target, ...rest },
        targetIndex = db.users.indexOf(target);
      db.users.splice(targetIndex, 1, newItem);
      setJSON(db.users);
      return newItem;
    },
    changePw: (_, { jwt, newPassword, password }, { db }) => {
      const target = db.users.find((data) => data.jwt === jwt);
      if (!target) throw new GraphQLError("해당 유저를 찾을 수 없습니다.");
      if (password !== target.password)
        throw new GraphQLError("비밀번호가 일치하지 않습니다.");
      if (password === newPassword)
        throw new GraphQLError("현재 비밀번호와 다르게 입력해주세요.");
      const newItem = { ...target, password: newPassword },
        targetIndex = db.users.indexOf(target);
      db.users.splice(targetIndex, 1, newItem);
      setJSON(db.users);
      return { count: 1 };
    },
    forgotPw: (_, { email, questionIndex, questionAnswer }, { db }) => {
      const target = db.users.find((data) => data.email === email);
      if (!target) throw new GraphQLError("등록되지 않은 유저입니다.");
      if (target.questionIndex !== questionIndex)
        throw new GraphQLError("해당 질문이 일치하지 않습니다.");
      if (target.questionAnswer !== questionAnswer)
        throw new GraphQLError("해당 답변이 일치하지 않습니다.");
      return {
        password: target.password,
      };
    },
    remove: (_, { jwt }, { db }) => {
      const target = db.users.find((data) => data.jwt === jwt);
      if (!target) throw new GraphQLError("해당 유저를 찾을 수 없습니다.");
      const targetIndex = db.users.indexOf(target);
      db.users.splice(targetIndex, 1);
      setJSON(db.users);
      return { count: 1 };
    },
  },
};
export default usersResolver;
