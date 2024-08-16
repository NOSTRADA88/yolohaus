import {useCallback, useEffect, useState} from "react";
import { BlogDetailProps, Post } from "../interfaces";
import { fetchBlogDetailPage } from "../api/blog";

const useBlogDetailPage = ({ blogSlug }: BlogDetailProps) => {
  const [postData, setPostData] = useState<Post>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>()

  const fetchPostData = useCallback(async (blogSlug: string, signal: AbortSignal) => {
    try {
      const response = await fetchBlogDetailPage(blogSlug, signal);
      setPostData({
        metadata: {
          title: response.Metadata.MetaTitle,
          description: response.Metadata.MetaDescription,
        },
        title: response.Title,
        text: response.BlogText.map((item: any) => {
          switch (item.type) {
            case "paragraph":
              return {
                type: "paragraph",
                children: item.children.map((child: any) => ({
                  type: "text",
                  text: child.text,
                  bold: child.bold,
                  italic: child.italic,
                  underline: child.underline,
                })),
              };
            case "list":
              return {
                type: "list",
                format: item.format,
                children: item.children.map((listItem: any) => ({
                  type: "list-item",
                  children: listItem.children.map((child: any) => ({
                    type: "text",
                    text: child.text,
                    bold: child.bold,
                    italic: child.italic,
                    underline: child.underline,
                  })),
                })),
              };
            case "heading":
              return {
                type: "heading",
                level: item.level,
                children: item.children.map((child: any) => ({
                  type: "text",
                  text: child.text,
                  bold: child.bold,
                  italic: child.italic,
                  underline: child.underline,
                })),
              };
            case "quote":
              return {
                type: "quote",
                children: item.children.map((child: any) => ({
                  type: "text",
                  text: child.text,
                  bold: child.bold,
                  italic: child.italic,
                  underline: child.underline,
                })),
              };
            case "image":
              return {
                type: "image",
                photo: {
                  type: "photo",
                  url: item.image.url,
                  name: item.image.name,
                  width: item.image.width,
                  height: item.image.height,
                },
              };
            default:
              return item;
          }
        }),
        photo: {
          type: "photo",
          name: response.Media.data[0].attributes.name,
          url: response.Media.data[0].attributes.url,
        }
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(Error(`unknown error occurred: ${error}`))
      }
    } finally {
      setIsLoading(false)
    }
  }, [blogSlug])

  useEffect(() => {
    const abortController = new AbortController();
    fetchPostData(blogSlug, abortController.signal)
    return () => abortController.abort()
  }, [fetchPostData, blogSlug]);

  return {postData, isLoading, error};
};

export default useBlogDetailPage;
