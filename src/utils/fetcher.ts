import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { UserType } from "../types/user";
import { UploadImageProps } from "../types/hooks";
import getJWTHeader from "./getJWTHeader";

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
    const { status } = error.response;
    const message = error.response.data.error.message;
    const details = error.response.data.error.details;
    error.response.data = {
      status,
      message,
      details
    };
    return Promise.reject(error);
  };
  return instance(options).then(onSuccess).catch(onError);
};

export default fetcher;

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

export const getUser = async (user: undefined | UserType | null) => {
  if (!user) return null;
  const { data } = await fetcher({
    url: `/users/${user.user.id}`,
    method: "get",
    params: {
      populate: "*"
    }
  });
  return data;
};

export const uploadImage = async ({ image, user }: UploadImageProps) => {
  const formData = new FormData();
  formData.append("files", image);
  formData.append("refId", user.user.id.toString());
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
    headers: getJWTHeader(user)
  });
  return data;
};
