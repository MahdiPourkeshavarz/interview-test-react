import axios from "axios";

import { BASE_URL } from "../constants";

export const httpRequest = axios.create({
  baseURL: BASE_URL,
});

httpRequest.interceptors.request.use(
  (req) => {
    if (req) {
      req.headers["Content-Type"] = "application/json";
    }
    return req;
  },
  (error) => Promise.reject(error)
);
