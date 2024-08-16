import { useEffect, useState } from "react";
import { BlogsData } from "../interfaces";
import { fetchBlogPage } from "../api/blog";

const useBlogPage = () => {
  const [blogData, setBlogData] = useState<BlogsData>();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetchBlogPage();
        setBlogData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
          title: response.Title,
          posts: response.posts_list.data.map((post: any) => ({
            title: post.attributes.Title,
            text: post.attributes.BlogText,
            slug: post.attributes.slug,
            photo: {
              name: post.attributes.Media.data[0].attributes.name,
              url: post.attributes.Media.data[0].attributes.url,
            },
          })),
        });
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
    fetchBlog();
  }, []);

  return blogData;
};

export default useBlogPage;
