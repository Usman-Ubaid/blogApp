import { useNavigate } from "react-router-dom";
import { BlogCardProps } from "../../types/blog";
import { useAuth } from "../../hooks/AuthContext";

const BlogCard = ({ data }: BlogCardProps) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className="blog-card-wrapper">
      {data &&
        data.map((item) => (
          <div
            role="link"
            className="blog-card"
            key={item.id}
            onClick={() => navigate(`/blog/${item.id}`)}
          >
            <span>{currentUser.username}</span>
            <h2>{item?.heading}</h2>
          </div>
        ))}
    </div>
  );
};

export default BlogCard;
