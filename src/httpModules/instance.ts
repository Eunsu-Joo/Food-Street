import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

class HttpModules {
  protected instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.response.use(
      this.transform().onFulfilled,
      this.transform().onReject
    );
  }
  private transform() {
    return {
      onFulfilled: (response: AxiosResponse): AxiosResponse => {
        response.data = {
          status: response.status,
          data: {
            posts: response.data.data,
          },
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
    };
  }
  getPosts = async () => {
    const { data } = await this.instance.get(`/store-posts`, {
      params: {
        populate: "*",
      },
    });
    return data;
  };
}
const httpModules = new HttpModules();
export default httpModules;
