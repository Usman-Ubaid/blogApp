import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/common/Layout";
import { useBlog } from "../hooks/SingleBlogContext";
import { useEffect } from "react";
import { axiosPrivate } from "../services/api/axiosConfig";

const Blog = () => {
  const { id } = useParams();
  const { selectedBlog, setSelectedBlog } = useBlog();
  const { heading, body, created_at } = selectedBlog;
  const navigate = useNavigate();

  const originalDate = new Date(created_at);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = originalDate.toLocaleDateString("en-US", options);

  const handleEditPost = () => {
    navigate(`/updateBlog/${id}`);
  };

  useEffect(() => {
    const fetchIndividualBlog = async () => {
      try {
        const res = await axiosPrivate.get(`/blog/${id}`);
        setSelectedBlog(res.data?.blog[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIndividualBlog();
  }, [id]);

  return (
    <Layout>
      <div className="blog-details">
        <div className="blog-head">
          <h1>{heading}</h1>
          <div>
            <span>{formattedDate}</span>
            <button onClick={handleEditPost} className="common-btn">
              Edit Post
            </button>
            <button className="common-btn">Delete Post</button>
          </div>
        </div>
        <div className="blog-content">
          <p>{body}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
