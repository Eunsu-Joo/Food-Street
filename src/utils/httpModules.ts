import axios, { AxiosError, AxiosResponse } from "axios";
import STATUS from "../constants/status";

const httpModules = {
  instance: axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  transform: {
    onFulfilled: (response: AxiosResponse): AxiosResponse => {
      response.data = {
        status: response.status,
        data: response.data,
        error: false,
      };
      return response;
    },
    onReject: (error: AxiosError): AxiosResponse => {
      if (!error.response) throw error;
      error.response.data = {
        status: error.response.status,
        error: true,
        data: null,
      };
      return error.response;
    },
  },

  get posts() {
    const { onFulfilled, onReject } = this.transform;
    this.instance.interceptors.response.use(onFulfilled, onReject);
    return {
      getPosts: async () => {
        const { data } = await this.instance.get("/store-posts?populate=*");
        return data;
      },
    };
  },
};
export default httpModules;
