import { axiosPrivate } from "./axiosConfig";

export const postBlogApi = async (title: string, content: string) => {
  const response = axiosPrivate.post("/blog", {
    heading: title,
    body: content,
  });
  return response;
};

export const updateBlogApi = async (
  title: string,
  content: string,
  id: string
) => {
  const response = await axiosPrivate.put(`/blog/${id}`, {
    heading: title,
    body: content,
  });
  return response;
};

export const deleteBlogApi = async (id: string) => {
  const response = await axiosPrivate.delete(`/blog/${id}`);
  return response;
};
