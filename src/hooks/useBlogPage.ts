import {useCallback, useEffect, useState} from "react";
import { BlogsData } from "../interfaces";
import { fetchBlogPage } from "../api/blog";

const useBlogPage = () => {
  const [blogData, setBlogData] = useState<BlogsData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>()

  const fetchBlog =  useCallback(async (signal: AbortSignal) => {
    try {
      const response = await fetchBlogPage(signal);
      setBlogData({
        metadata: {
          title: response.Metadata.MetaTitle,
          description: response.Metadata.MetaDescription,
        },
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(Error(`unknown error occurred: ${error}`))
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController;
    fetchBlog(abortController.signal);
    return () => abortController.abort()
  }, [blogData]);

  return {blogData, isLoading, error};
};

export default useBlogPage;
