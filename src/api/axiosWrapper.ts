/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getItem, LOCAL_STORAGE_KEY } from "../services/localStorage";

const ACCESS_TOKEN = getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

const axiosWrapper = {
  get: (url: string) =>
    axios.get(url, {
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    }),

  post: (url: string, data: any) =>
    axios.post(url, data, {
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    }),

  put: (url: string, data: any) =>
    axios.put(url, data, {
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    }),

  delete: (url: string) =>
    axios.delete(url, {
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    }),
};

axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx causes this function to trigger
    if (error.response && error.response.status === 401) {
      // localStorage.clear();

      //   // Redirect to the login page
      window.location.href = "/login"; // or use history.push('/login') if within a component
    }
    return Promise.reject(error);
  },
);

export default axiosWrapper;
