import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import PAGE from "../constants/page";
import { UserType } from "../types/user";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

const fetcher = ({ ...options }: AxiosRequestConfig): Promise<any> => {
  const onSuccess = (data: AxiosResponse) => data;
  const onError = (error: AxiosError<any, null>): Promise<never> => {
    if (!error.response) throw error;
    const status = error.response.status;
    const name = error.name;
    const message = error.response.data.error.message;
    error.response.data = {
      status,
      name,
      message
    };
    return Promise.reject(error);
  };
  return instance(options).then(onSuccess).catch(onError);
};

export const getPosts = async (currentPage: number) => {
  const { data } = await fetcher({
    url: "/store-posts",
    method: "get",
    params: {
      populate: "*",
      pagination: {
        page: currentPage,
        pageSize: PAGE.MAX_PAGE
      }
    }
  });
  return data;
};

export const getDetailPost = async (pageId: number) => {
  const { data } = await fetcher({
    url: `/store-posts/${pageId}`,
    method: "get",
    params: {
      populate: "*"
    }
  });
  return data;
};

export const getUser = async (user: UserType | null | undefined) => {
  if (!user) return null;
  const { data } = await fetcher({
    url: `/users/${user.user.id}`,
    method: "get"
  });
  return data;
};

export const loginUser = async ({ identifier, password }: { identifier: string; password: string }) => {
  const { data } = await fetcher({
    url: `/auth/local`,
    method: "post",
    data: {
      identifier,
      password
    }
  });
  return data;
};

export const signupUser = async ({ email, username, password }: { email: string; password: string; username: string }) => {
  const { data } = await fetcher({
    url: `/auth/local/register`,
    method: "post",
    data: {
      email,
      username,
      password
    }
  });
  return data;
};
