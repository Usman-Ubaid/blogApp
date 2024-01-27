import Layout from "../components/common/Layout";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../services/api/axiosConfig";
import axios from "axios";
import { handleGetBlogsError } from "../utils/handleAxiosErrors";

type BlogState = {
  id: number;
  heading: string;
  body: string;
  created_at: string;
}[];

const Blogs = () => {
  const [data, setData] = useState<BlogState>();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const results = await axiosPrivate.get("/blog");
        setData(results.data.blogs);
        console.log(results.data.blogs);
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
          <p>
            {data &&
              data.map((item) => <span key={item.id}>{item?.heading}</span>)}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Blogs;
