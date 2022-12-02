import PAGE from "../constants/page";
import axios, { AxiosError, AxiosResponse } from "axios";
import STATUS from "../constants/status";

type fetcherObj = {
  [key: string]: any;
};

type FetcherProps = {
  url: string;
  method: "get" | "post" | "put" | "delete";
  params?: fetcherObj;
  body?: fetcherObj;
  jwt?: string;
};

const fetcher = async ({ url, method, params, body, jwt }: FetcherProps) => {
  let instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      response.data = {
        data: response.status === STATUS.OK ? response.data.data : null,
        pagination: response.data?.meta?.pagination ?? null,
      };
      return response;
    },
    (error: AxiosError): AxiosResponse => {
      if (!error.response) throw error;
      error.response.data = {
        pagination: null,
        data: null,
      };
      return error.response;
    }
  );

  if (params) {
    instance.defaults.params = params;
  }
  if (body) {
    instance.defaults.data = body;
  }
  if (jwt) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }
  const { data } = await instance[method](url);
  return data;
};

const httpModules = {
  getPosts: (page: number) =>
    fetcher({
      params: {
        populate: "*",
        pagination: {
          page,
          pageSize: PAGE.MAX_PAGE,
        },
      },
      url: "store-posts",
      method: "get",
    }),
};
export default httpModules;
