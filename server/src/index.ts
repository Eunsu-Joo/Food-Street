import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import resolvers from "./resolvers";
import "dotenv/config";
import { GraphQLError } from "graphql/error";
import { DBFile, readDB } from "./dbController";
import cors from "cors";
const express = require("express");
const formatError = (err: GraphQLError) => {
  console.error("--- GraphQL Error ---");
  console.error("Path:", err.path);
  console.error("Message:", err.message);
  console.error("Code:", err.extensions.code);
  console.error("Original Error", err.originalError);
  return err;
};
(async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
      //전역으로 사용할 db
      db: {
        posts: readDB(DBFile.POSTS),
        users: readDB(DBFile.USERS),
      },
    },
    debug: false,
    formatError,
  });

  const app = express();
  await server.start();
  //server 에게 express로 구동이 된다 라고  알려주는 거임.

  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
      origin: [
        "http://localhost:3000",
        "https://studio.apollographql.com",
        "https://food-street-client.vercel.app",
      ],
      credentials: true,
    },
  });
  const port = process.env.PORT || 4000;
  await app.listen({ port });
  console.log("server listening on ", `port is ${port}`);
})();
