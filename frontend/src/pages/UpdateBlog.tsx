import axios from "axios";
import Layout from "../components/common/Layout";
import useMessageHandling from "../hooks/useMessageHandling";
import { updateBlogApi } from "../services/api/blogApi";
import { handlePostBlogApiError } from "../utils/handleAxiosErrors";
import { useMessage } from "../hooks/MessageContext";
import { useForm } from "../hooks/useForm";
import { BlogData } from "../types/form";
import Input from "../components/form/Input";
import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/SingleBlogContext";
import { useEffect } from "react";

const UpdateBlog = () => {
  const { formData, setFormData, handleInputChange } = useForm<BlogData>({
    title: "",
    content: "",
  });
  const { selectedBlog } = useBlog();
  const { errorMsg, setErrorMsg, successMsg, setSuccessMsg } = useMessage();
  const { id } = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        const res = await updateBlogApi(formData, id);
        setSuccessMsg("Blog posted successfully");
        console.log(res);
      } else {
        console.log("No id found");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const err = handlePostBlogApiError(error.response.status);
        setErrorMsg(err);
      }
    }
  };

  useEffect(() => {
    setFormData({
      title: selectedBlog.heading,
      content: selectedBlog.body,
    });
  }, [selectedBlog]);

  // Reset messages when the component unmounts or when errorMsg/successMsg change
  useMessageHandling({ setErrorMsg, setSuccessMsg });

  return (
    <Layout>
      <div className="blog-post-wrapper">
        <h1>Update Blog</h1>
        <div className="blog-form-wrapper">
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          {successMsg && <p className="success-msg">{successMsg}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title*</label>
              <Input
                name="title"
                id="title"
                onChange={handleInputChange}
                value={formData.title}
              />
            </div>
            <div className="content-textarea">
              <label>Content*</label>
              <textarea
                name="content"
                id="content"
                onChange={handleInputChange}
                value={formData.content}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateBlog;
