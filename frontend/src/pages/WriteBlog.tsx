import axios from "axios";
import Layout from "../components/common/Layout";
import Input from "../components/form/Input";
import { useMessage } from "../hooks/MessageContext";
import { useForm } from "../hooks/useForm";
import { postBlog } from "../services/api/blogApi";
import { BlogData } from "../types/form";
import { handlePostBlogApiError } from "../utils/handleAxiosErrors";

const WriteBlog = () => {
  const { formData, handleInputChange } = useForm<BlogData>({
    title: "",
    content: "",
  });
  const { errorMsg, setErrorMsg, successMsg, setSuccessMsg } = useMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await postBlog(formData);
      setSuccessMsg("Blog posted successfully");
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
      console.log(res.statusText);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const err = handlePostBlogApiError(error.response.status);
        setErrorMsg(err);
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      }
    }
  };

  return (
    <Layout>
      <div className="blog-post-wrapper">
        <h1>Create Post</h1>
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
            <div className="blog-content">
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
              Publish
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default WriteBlog;
