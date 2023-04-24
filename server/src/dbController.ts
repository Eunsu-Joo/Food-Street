import { resolve } from "path";

export enum DBFile {
  POSTS = "posts",
  USERS = "users",
}
const fs = require("fs");
const basePath = resolve();
const filenames = {
  [DBFile.POSTS]: resolve(basePath, "src/db/posts.json"),
  [DBFile.USERS]: resolve(basePath, "src/db/users.json"),
};
export const readDB = (target: DBFile) =>
  JSON.parse(fs.readFileSync(filenames[target], "utf-8"));
export const writeDB = (target: DBFile, data: any) =>
  fs.writeFileSync(filenames[target], JSON.stringify(data));
