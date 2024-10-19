import axios from "axios";

import { BASE_URL } from "../constants";

export const httpRequest = axios.create({
  baseURL: BASE_URL,
});

httpRequest.interceptors.request.use(
  (req) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);
