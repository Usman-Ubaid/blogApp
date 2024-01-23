import Layout from "../components/common/Layout";
import Input from "../components/form/Input";
import { useForm } from "../hooks/useForm";
import { WriteBlogData } from "../types/form";

const WriteBlog = () => {
  const { formData, handleInputChange } = useForm<WriteBlogData>({
    title: "",
    content: "",
  });

  return (
    <Layout>
      <div className="blog-post-wrapper">
        <h1>Create Post</h1>
        <div className="blog-form-wrapper">
          <form>
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
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default WriteBlog;
