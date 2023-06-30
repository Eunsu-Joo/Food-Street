import { request, RequestDocument } from "graphql-request";
const BASE_URL =  process.env.REACT_APP_PRODUCTION_API_URL;

const fetcher = (query: RequestDocument, data = {}) =>
  request(`${BASE_URL}/graphql`, query, data, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": BASE_URL as string
  });
export default fetcher;
