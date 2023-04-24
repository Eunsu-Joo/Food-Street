import { ResolverType, UserRequest } from "./types";
import { DBFile, writeDB } from "../dbController";
import { v4 as uuid } from "uuid";
const setJSON = (data: any[]) => writeDB(DBFile.USERS, data);
const usersResolver: ResolverType = {
  Query: {
    login: (parent, { email, password }, { db }, info) => {
      const target = db.users.find((item) => item.email === email);
      if (!target) throw new Error("해당 유저를 찾을 수 없습니다.");
      if (target.password !== password)
        throw new Error("비밀번호가 일치하지 않습니다.");
      return { jwt: target.jwt };
    },
  },
  Mutation: {
    signup: (_, { email, password, username }, { db }) => {
      const duplicatedUsername = db.users.find(
        (item) => item.username === username
      );
      if (!!duplicatedUsername) throw new Error("사용중인 닉네임 입니다.");
      const duplicatedEmail = db.users.find((item) => item.email === email);
      if (!!duplicatedEmail) throw new Error("사용중인 이메일 입니다.");
      const jwt = uuid();
      const newUser = {
        email,
        password,
        username,
        jwt,
      };
      db.users.push(newUser);
      setJSON(db.users);
      return { email, username, jwt };
    },
  },
};
export default usersResolver;
