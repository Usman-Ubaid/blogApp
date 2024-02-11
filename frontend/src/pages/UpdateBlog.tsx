import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Layout from "../components/common/Layout";
import useMessageHandling from "../hooks/useMessageHandling";
import { updateBlogApi } from "../services/api/blogApi";
import { handlePostBlogApiError } from "../utils/handleAxiosErrors";
import { useMessage } from "../hooks/MessageContext";
import { useFormHook } from "../hooks/useFormHook";
import Input from "../components/form/Input";
import { BlogData } from "../types/blog";
import { useBlogDataContext } from "../hooks/BlogDataContext";
import { useIndividualBlog } from "../hooks/useIndividualBlog";
import Editor from "../components/quillEditor/Editor";

const UpdateBlog = () => {
  const { id } = useParams();
  const { localCache, selectedBlog, setSelectedBlog } = useIndividualBlog(
    id as string
  );
  const [quillBody, setQuillBody] = useState(selectedBlog?.body || "");

  const { formData, setFormData, handleInputChange } = useFormHook<BlogData>({
    title: "",
  });
  const { errorMsg, setErrorMsg, successMsg, setSuccessMsg } = useMessage();
  const { setBlogData } = useBlogDataContext();

  const handleBodyText = (content) => {
    setQuillBody(content);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        await updateBlogApi(formData.title, quillBody, id);

        setBlogData((prevData) => {
          const updatedData = prevData.map((blog) =>
            String(blog.id) === id
              ? { ...blog, heading: formData.title, body: quillBody }
              : blog
          );
          return updatedData;
        });

        setSelectedBlog((prevValue) => ({
          ...prevValue,
          heading: formData.title,
          body: quillBody,
        }));
        localCache[id] = {
          ...selectedBlog,
          heading: formData.title,
          body: quillBody,
        };

        setSuccessMsg("Blog updated successfully");
        console.log("Updated");
      } else {
        console.log("Invalid id");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const err = handlePostBlogApiError(error.response.status);
        setErrorMsg(err);
      }
    }
  };

  useEffect(() => {
    if (id) {
      setFormData({
        title: localCache[id].heading || "",
      });
      setQuillBody(localCache[id].body || "");
    }
  }, []);

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
              <Editor value={quillBody} onChange={handleBodyText} />
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
