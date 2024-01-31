import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";
import { axiosPrivate } from "../services/api/axiosConfig";
import { handleGetBlogsError } from "../utils/handleAxiosErrors";
import BlogCard from "../components/blog/BlogCards";
import { BlogType } from "../types/blog";

const BlogsList = () => {
  const [blogList, setBlogList] = useState<BlogType[]>();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const results = await axiosPrivate.get("/blog");
        setBlogList(results.data.blogs);
      } catch (error) {
        if (axios.isAxiosError(error) && error?.response) {
          const msg = handleGetBlogsError(error.response?.status);
          console.log(msg);
        }
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Layout>
      <div className="blogs-wrapper">
        <h1>Blogs</h1>
        <div className="blogs-content">
          {blogList && <BlogCard data={blogList} />}
        </div>
        <div>{!blogList && <h2>No Blogs Found</h2>}</div>
      </div>
    </Layout>
  );
};

export default BlogsList;
