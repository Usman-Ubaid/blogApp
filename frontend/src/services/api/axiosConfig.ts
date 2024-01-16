import axios from "axios";

const baseURL = "http://localhost:3001/api";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});
