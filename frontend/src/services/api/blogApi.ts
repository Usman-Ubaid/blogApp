import axios from "axios";
import { BlogData } from "../../types/form";

export const postBlog = async (blogData: BlogData) => {
  try {
    const response = axios.post("http://localhost:3001/api/blog", {
      heading: blogData.title,
      body: blogData.content,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
