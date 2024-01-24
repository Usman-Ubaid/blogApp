import Layout from "../components/common/Layout";
import Input from "../components/form/Input";
import { useForm } from "../hooks/useForm";
import { postBlog } from "../services/api/blogApi";
import { BlogData } from "../types/form";

const WriteBlog = () => {
  const { formData, handleInputChange } = useForm<BlogData>({
    title: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await postBlog(formData);
    console.log(res);
  };

  return (
    <Layout>
      <div className="blog-post-wrapper">
        <h1>Create Post</h1>
        <div className="blog-form-wrapper">
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
