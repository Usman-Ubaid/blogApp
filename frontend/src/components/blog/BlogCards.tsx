import { useNavigate } from "react-router-dom";
import { BlogCardProps } from "../../types/blog";

const BlogCard = ({ data }: BlogCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="blog-card-wrapper">
      {data &&
        data.map((item) => (
          <div className="blog-card" key={item.id}>
            <span onClick={() => navigate(`/blog/${item.id}`)}>
              {item?.heading}
            </span>
          </div>
        ))}
    </div>
  );
};

export default BlogCard;
