import Layout from "../components/common/Layout";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../services/api/axiosConfig";
import axios from "axios";
import { handleGetBlogsError } from "../utils/handleAxiosErrors";
import BlogCard, { BlogType } from "../components/blog/BlogCards";

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
      </div>
    </Layout>
  );
};

export default BlogsList;
