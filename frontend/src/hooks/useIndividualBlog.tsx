import { useState, useEffect } from "react";
import { BlogType } from "../types/blog";
import { axiosPrivate } from "../services/api/axiosConfig";

type LocalCache = {
  [key: string]: BlogType;
};
const localCache: LocalCache = {};

export const useIndividualBlog = (id: string) => {
  const [selectedBlog, setSelectedBlog] = useState<BlogType>(Object);

  useEffect(() => {
    if (localCache[id]) {
      setSelectedBlog(localCache[id]);
    } else {
      fetchIndividualBlog();
    }
    async function fetchIndividualBlog() {
      try {
        if (localCache[id]) {
          setSelectedBlog(localCache[id]);
        } else {
          const res = await axiosPrivate.get(`/blog/${id}`);
          setSelectedBlog(res.data?.blog[0]);
          localCache[id] = res.data.blog[0];
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [id, selectedBlog.heading, selectedBlog.body]);

  const updatSelectedBlog = (title: string, body: string) => {
    setSelectedBlog((prevValue) => ({
      ...prevValue,
      heading: title,
      body: body,
    }));
  };

  const updateLocalCache = (id: string, title: string, body: string) => {
    localCache[id] = {
      ...selectedBlog,
      heading: title,
      body: body,
    };
  };

  return { selectedBlog, localCache, setSelectedBlog, updatSelectedBlog, updateLocalCache };
};
