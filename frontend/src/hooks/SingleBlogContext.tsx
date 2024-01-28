import { createContext, useContext, useState } from "react";
import { BlogType } from "../components/blog/BlogCards";

type BlogContext = {
  selectedBlog: BlogType;
  setSelectedBlog: React.Dispatch<React.SetStateAction<BlogType>>;
};

export const SingleBlogContext = createContext<BlogContext>({
  selectedBlog: {
    id: 0,
    heading: "",
    body: "",
    created_at: "",
  },
  setSelectedBlog: () => null,
});

export const SingleBlogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedBlog, setSelectedBlog] = useState<BlogType>(Object);

  return (
    <SingleBlogContext.Provider value={{ selectedBlog, setSelectedBlog }}>
      {children}
    </SingleBlogContext.Provider>
  );
};

export const useBlog = () => {
  return useContext(SingleBlogContext);
};
