import { createContext, useContext, useEffect, useState } from "react";
import { BlogType } from "../types/blog";

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
  const storedBlog: BlogType = JSON.parse(
    localStorage.getItem("selectedBlog") || "null"
  );
  const [selectedBlog, setSelectedBlog] = useState<BlogType>(
    storedBlog || {
      id: 0,
      heading: "",
      body: "",
      created_at: "",
    }
  );

  useEffect(() => {
    localStorage.setItem("selectedBlog", JSON.stringify(selectedBlog));
  }, [selectedBlog]);

  return (
    <SingleBlogContext.Provider value={{ selectedBlog, setSelectedBlog }}>
      {children}
    </SingleBlogContext.Provider>
  );
};

export const useBlog = () => {
  return useContext(SingleBlogContext);
};
