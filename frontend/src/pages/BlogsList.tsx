import Layout from "../components/common/Layout";
import BlogCard from "../components/blog/BlogCards";
import { useBlogDataContext } from "../hooks/BlogDataContext";

const BlogsList = () => {
  const { blogData } = useBlogDataContext();

  return (
    <Layout>
      <div className="blogs-wrapper">
        <h1>Blogs</h1>
        <div className="blogs-content">
          {blogData && <BlogCard data={blogData} />}
        </div>
        <div>{!blogData && <h2>No Blogs Found</h2>}</div>
      </div>
    </Layout>
  );
};

export default BlogsList;
