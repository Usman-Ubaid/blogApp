import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../services/api/axiosConfig";
import { useBlog } from "../../hooks/SingleBlogContext";

export type BlogCardProps = {
  data: BlogType[];
};

export type BlogType = {
  id: number;
  heading: string;
  body: string;
  created_at: string;
};

const BlogCard = ({ data }: BlogCardProps) => {
  const { setSelectedBlog } = useBlog();
  const navigate = useNavigate();

  const getBlog = async (id: number) => {
    try {
      const res = await axiosPrivate.get(`/blog/${id}`);
      setSelectedBlog(res.data?.blog[0]);
      navigate("/blog");
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
