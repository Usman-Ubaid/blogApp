import { BlogData } from "../../types/form";
import { axiosPrivate } from "./axiosConfig";

export const postBlog = async (blogData: BlogData) => {
  const response = axiosPrivate.post("/blog", {
    heading: blogData.title,
    body: blogData.content,
  });
  return response;
};

export const updateBlog = async (blogData: BlogData, id: string) => {
  const response = await axiosPrivate.put(`/blog/${id}`, {
    heading: blogData.title,
    body: blogData.content,
  });
  return response;
};
