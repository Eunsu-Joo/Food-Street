import { request, RequestDocument } from "graphql-request";
const BASE_URL = "http://ec2-52-78-80-40.ap-northeast-2.compute.amazonaws.com:4000"

const fetcher = (query: RequestDocument, data = {}) =>
  request(`${BASE_URL}/graphql`, query, data, {
    "Content-Type": "application/json", 

  });
export default fetcher;
