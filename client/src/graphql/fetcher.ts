import { request, RequestDocument } from "graphql-request";
const BASE_URL = "http://localhost:4000";
const fetcher = (query: RequestDocument, data = {}) =>
  request(`${BASE_URL}/graphql`, query, data, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": BASE_URL
  });
export default fetcher;
