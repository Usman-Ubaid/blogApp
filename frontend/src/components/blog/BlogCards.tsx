import { useNavigate } from "react-router-dom";
import { BlogCardProps } from "../../types/blog";
import { useAuth } from "../../hooks/AuthContext";
import { formatDate } from "../../utils/formatDate";

const BlogCard = ({ data }: BlogCardProps) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className="blog-card-wrapper">
      {data &&
        data.map((item) => (
          <div className="blog-card" key={item.id}>
            <span>
              {currentUser.username} - {formatDate(item.created_at)}
            </span>
            <h2 onClick={() => navigate(`/blog/${item.id}`)}>
              {item?.heading}
            </h2>
          </div>
        ))}
    </div>
  );
};

export default BlogCard;
