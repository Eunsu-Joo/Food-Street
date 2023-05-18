import { resolve } from "path";

export enum DBFile {
  POSTS = "posts",
  USERS = "users",
}
const fs = require("fs");
const basePath = resolve();
//File  절대경로
const filenames = {
  [DBFile.POSTS]: resolve(basePath, "src/db/posts.json"),
  [DBFile.USERS]: resolve(basePath, "src/db/users.json"),
};
//파일 읽어오기
export const readDB = (target: DBFile) =>
  JSON.parse(fs.readFileSync(filenames[target], "utf-8"));
//파일 덮어쓰기
export const writeDB = (target: DBFile, data: any) =>
  fs.writeFileSync(filenames[target], JSON.stringify(data));
