import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { useBlog } from "../hooks/SingleBlogContext";
import { axiosPrivate } from "../services/api/axiosConfig";
import { deleteBlogApi } from "../services/api/blogApi";
import { formatDate } from "../utils/formatDate";
import DeleteBlogPortal from "../components/DeletePopup";

const Blog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { selectedBlog, setSelectedBlog } = useBlog();
  const { heading, body, created_at } = selectedBlog;
  const navigate = useNavigate();

  const formattedDate = formatDate(created_at);

  const handleEditPost = () => {
    navigate(`/updateBlog/${id}`);
  };

  const handleDeletePost = async () => {
    try {
      if (id) {
        await deleteBlogApi(id);
        console.log("Blog deleted");
        navigate("/blogs");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          console.log("Blog Not Found");
        } else {
          console.log("Error deleting the blog:", error);
        }
      }
    }
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

  const openPopup = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
            <button onClick={openPopup} className="common-btn">
              Delete Post
            </button>

            {isOpen && (
              <DeleteBlogPortal onOpen={isOpen}>
                <div className="portal-content">
                  <p>Are you sure you want to delete the blog?</p>
                  <button className="btn portal-btn" onClick={handleDeletePost}>
                    Delete
                  </button>
                  <button className="btn portal-btn" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </DeleteBlogPortal>
            )}
          </div>
        </div>
        <div className="blog-content">
          <p dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
