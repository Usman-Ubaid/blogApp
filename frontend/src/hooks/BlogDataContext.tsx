import { createContext, useContext, useEffect, useState } from "react";
import { BlogType } from "../types/blog";
import { axiosPrivate } from "../services/api/axiosConfig";
import axios from "axios";
import { handleGetBlogsError } from "../utils/handleAxiosErrors";
import {
  deleteBlogApi,
  postBlogApi,
  updateBlogApi,
} from "../services/api/blogApi";
import { useAuth } from "./AuthContext";

type BlogContextType = {
  blogData: BlogType[];
  addBlog: (title: string, value: string) => Promise<void>;
  updateBlog: (title: string, body: string, id: string) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
};

export const BlogDataContext = createContext<BlogContextType>({
  blogData: [
    {
      id: 0,
      heading: "",
      body: "",
      created_at: "",
    },
  ],
  addBlog: async () => {},
  updateBlog: async () => {},
  deleteBlog: async () => {},
});

export const BlogDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [blogData, setBlogData] = useState<BlogType[]>([]);
  const { currentUser } = useAuth();
  const fetchBlogs = async () => {
    try {
      const results = await axiosPrivate.get("/blog");
      setBlogData(results.data.blogs);
    } catch (error) {
      if (axios.isAxiosError(error) && error?.response) {
        const msg = handleGetBlogsError(error.response?.status);
        console.log(msg);
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchBlogs();
    }
  }, [currentUser]);

  const addBlog = async (title: string, value: string) => {
    const res = await postBlogApi(title, value);
    setBlogData((prevValue) => [...prevValue, res.data.blog]);
  };

  const updateBlog = async (title: string, body: string, id: string) => {
    await updateBlogApi(title, body, id);

    setBlogData((prevData) => {
      const updatedData = prevData.map((blog) =>
        String(blog.id) === id ? { ...blog, heading: title, body: body } : blog
      );
      return updatedData;
    });
  };

  const deleteBlog = async (id: string) => {
    await deleteBlogApi(id);

    setBlogData((prevValue) => {
      const filterData = prevValue.filter((blog) => blog.id !== Number(id));
      return filterData;
    });
  };

  return (
    <BlogDataContext.Provider
      value={{ blogData, addBlog, updateBlog, deleteBlog }}
    >
      {children}
    </BlogDataContext.Provider>
  );
};

export const useBlogDataContext = () => {
  return useContext(BlogDataContext);
};
