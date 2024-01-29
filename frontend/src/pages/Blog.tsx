import Layout from "../components/common/Layout";
import { useBlog } from "../hooks/SingleBlogContext";

const Blog = () => {
  const { selectedBlog } = useBlog();
  const { heading, body, created_at } = selectedBlog;

  const originalDate = new Date(created_at);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = originalDate.toLocaleDateString("en-US", options);

  return (
    <Layout>
      <div className="blog-details">
        <div className="blog-head">
          <h1>{heading}</h1>
          <span>{formattedDate}</span>
          <span>Edit Post</span>
        </div>
        <div className="blog-content">
          <p>{body}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
