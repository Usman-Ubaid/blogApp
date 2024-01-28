import { useState } from "react";
import { axiosPrivate } from "../../services/api/axiosConfig";

type BlogCardProps = {
  data: Blog;
};

type Blog = {
  id: number;
  heading: string;
  body: string;
  created_at: string;
}[];

const BlogCard = ({ data }: BlogCardProps) => {
  const [selectedBlog, setSelectedBlog] = useState<Blog>();
  const getBlog = async (id: number) => {
    try {
      const res = await axiosPrivate.get(`/blog/${id}`);
      console.log(res.data?.blog);
      setSelectedBlog(res.data?.blog);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="blog-card-wrapper">
      {data &&
        data.map((item) => (
          <div className="blog-card" key={item.id}>
            <span onClick={() => getBlog(item.id)}> {item?.heading}</span>
          </div>
        ))}
    </div>
  );
};

export default BlogCard;
