import { BlogData } from "../../types/blog";
import { axiosPrivate } from "./axiosConfig";

export const postBlogApi = async (title: string, content: string) => {
  const response = axiosPrivate.post("/blog", {
    heading: title,
    body: content,
  });
  return response;
};

export const updateBlogApi = async (blogData: BlogData, id: string) => {
  const response = await axiosPrivate.put(`/blog/${id}`, {
    heading: blogData.title,
    body: blogData.content,
  });
  return response;
};

export const deleteBlogApi = async (id: string) => {
  const response = await axiosPrivate.delete(`/blog/${id}`);
  return response;
};
