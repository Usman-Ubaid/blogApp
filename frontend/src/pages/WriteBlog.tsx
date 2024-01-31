import axios from "axios";
import Layout from "../components/common/Layout";
import Input from "../components/form/Input";
import { useMessage } from "../hooks/MessageContext";
import { useFormHook } from "../hooks/useFormHook";
import { postBlogApi } from "../services/api/blogApi";
import { handlePostBlogApiError } from "../utils/handleAxiosErrors";
import useMessageHandling from "../hooks/useMessageHandling";
import { BlogData } from "../types/blog";

const WriteBlog = () => {
  const { formData, handleInputChange } = useFormHook<BlogData>({
    title: "",
    content: "",
  });
  const { errorMsg, setErrorMsg, successMsg, setSuccessMsg } = useMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await postBlogApi(formData);
      setSuccessMsg("Blog posted successfully");
      console.log(res.statusText);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const err = handlePostBlogApiError(error.response.status);
        setErrorMsg(err);
      }
    }
  };

  // Reset messages when the component unmounts or when errorMsg/successMsg change
  useMessageHandling({ setErrorMsg, setSuccessMsg });

  return (
    <Layout>
      <div className="blog-post-wrapper">
        <h1>Create Blog</h1>
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
              Publish
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default WriteBlog;
