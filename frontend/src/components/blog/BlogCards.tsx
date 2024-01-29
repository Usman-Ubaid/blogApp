import { useNavigate } from "react-router-dom";

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
