import { createContext, useContext, useEffect, useState } from "react";
import { BlogType } from "../types/blog";
import { axiosPrivate } from "../services/api/axiosConfig";
import axios from "axios";
import { handleGetBlogsError } from "../utils/handleAxiosErrors";

type BlogContextType = {
  blogData: BlogType[];
  setBlogData: React.Dispatch<React.SetStateAction<BlogType[]>>;
};

const BlogDataContext = createContext<BlogContextType>({
  blogData: [
    {
      id: 0,
      heading: "",
      body: "",
      created_at: "",
    },
  ],
  setBlogData: () => null,
});

export const BlogDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [blogData, setBlogData] = useState<BlogType[]>([]);

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
    fetchBlogs();
  }, []);

  return (
    <BlogDataContext.Provider value={{ blogData, setBlogData }}>
      {children}
    </BlogDataContext.Provider>
  );
};

export const useBlogDataContext = () => {
  return useContext(BlogDataContext);
};
