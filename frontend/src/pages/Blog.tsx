import Layout from "../components/common/Layout";
import { useBlog } from "../hooks/SingleBlogContext";

const Blog = () => {
  const { selectedBlog } = useBlog();
  const { heading, body, created_at } = selectedBlog;
  return (
    <Layout>
      <h1>{heading}</h1>
      <span>{created_at}</span>
      <p>{body}</p>
    </Layout>
  );
};

export default Blog;
