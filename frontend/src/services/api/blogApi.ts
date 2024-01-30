import axios from "axios";
import { BlogData } from "../../types/form";
import { axiosPrivate } from "./axiosConfig";

const BASE_URL = "http://localhost:3001/api";

export const postBlog = async (blogData: BlogData) => {
  const response = axios.post(`${BASE_URL}/blog`, {
    heading: blogData.title,
    body: blogData.content,
  });
  return response;
};

export const updateBlog = async (blogData: BlogData, id: string) => {
  const response = await axiosPrivate.put(`${BASE_URL}/blog/${id}`, {
    heading: blogData.title,
    body: blogData.content,
  });
  return response;
};
