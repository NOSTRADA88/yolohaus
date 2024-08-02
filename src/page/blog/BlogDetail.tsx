import { useEffect, useState } from "react";
import { fetchAboutData, fetchBlogData, fetchBlogDetailData } from "../../api";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import LazyLoad from "react-lazyload";
import { API_URL } from "../../constants";

interface BlogDetailProps {
  blogSlug: string;
}

interface ImageFormat {
  url: string;
}

interface Media {
  data: {
    id: number;
    attributes: {
      formats: {
        large: ImageFormat;
        small: ImageFormat;
        medium: ImageFormat;
        thumbnail: ImageFormat;
      };
      url: string;
    };
  }[];
}

interface CardDescriptionText {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

interface CardDescriptionListItem {
  type: "list-item";
  children: CardDescriptionText[];
}

interface CardDescriptionList {
  type: "list";
  format: "unordered";
  children: CardDescriptionListItem[];
}

interface CardDescriptionParagraph {
  type: "paragraph";
  children: CardDescriptionText[];
}

interface CardDescriptionHeading {
  type: "heading";
  level: number;
  children: CardDescriptionText[];
}

interface CardDescriptionQuote {
  type: "quote";
  children: CardDescriptionText[];
}

interface CardDescriptionImage {
  type: "image";
  image: {
    url: string;
    alternativeText: string;
  };
}

type CardDescription =
  | CardDescriptionParagraph
  | CardDescriptionList
  | CardDescriptionHeading
  | CardDescriptionQuote
  | CardDescriptionImage;

interface Post {
  id: number;
  attributes: {
    Title: string;
    BlogText: CardDescription[];
    slug: string;
    Media: Media;
  };
}

interface BlogsData {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  titleBlog: string;
  titleAbout: string;
  slugAbout: string;
  title: string;
  posts_list: Post[];
  slugBlog: string;
}

const BlogDetail = ({ blogSlug }: BlogDetailProps) => {
  const [blogData, setBlogData] = useState<BlogsData>({
    metaTitle: "",
    metaDescription: "",
    title: "",
    slug: "",
    titleBlog: "",
    slugAbout: "",
    titleAbout: "",
    posts_list: [],
    slugBlog: "",
  });

  const fetchData = async () => {
    try {
      const blogDetailsData = await fetchBlogDetailData(blogSlug);
      const blogsDataResponse = await fetchBlogData();
      const aboutData = await fetchAboutData();

      setBlogData({
        metaTitle: blogDetailsData.data[0].attributes.Metadata.MetaTitle,
        metaDescription:
          blogDetailsData.data[0].attributes.Metadata.MetaDescription,
        title: blogDetailsData.data[0].attributes.Title,
        slugBlog: blogDetailsData.data[0].attributes.slug,
        posts_list: blogDetailsData.data,
        slug: blogsDataResponse.slug,
        titleBlog: blogsDataResponse.Title,
        slugAbout: aboutData.slug,
        titleAbout: aboutData.Title,
      });
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [blogSlug]);

  function convertDescriptionToElements(
    description: CardDescription[]
  ): React.ReactNode[] {
    return description.map((desc, index) => {
      if (desc.type === "paragraph") {
        return (
          <p
            key={index}
            className="font-museo text-md max-md:text-sm font-light text-justify mb-4"
          >
            {desc.children.map((child, childIndex) => (
              <span
                key={childIndex}
                className={`${child.bold ? "font-bold" : ""} ${
                  child.italic ? "italic" : ""
                } ${child.underline ? "underline" : ""}`}
              >
                {child.text}
              </span>
            ))}
          </p>
        );
      }

      if (desc.type === "list") {
        return (
          <ul key={index} className="custom-list">
            {desc.children.map((listItem, listIndex) => (
              <li
                key={listIndex}
                className="font-museo text-md max-md:text-sm leading-relaxed font-light mb-2 text-maingray"
              >
                {listItem.children.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className={`${item.bold ? "font-bold text-maingray" : ""} ${
                      item.italic ? "italic text-maingray" : ""
                    } ${item.underline ? "underline text-maingray" : ""}`}
                  >
                    {item.text}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        );
      }

      if (desc.type === "heading") {
        const headingLevels = [
          "text-3xl",
          "text-2xl",
          "text-xl",
          "text-lg",
          "text-md",
          "text-sm",
        ];
        const level = desc.level - 1;
        return (
          <h1
            key={index}
            className={`font-museo font-bold ${headingLevels[level]} mb-4 text-maingray`}
          >
            {desc.children.map((child, childIndex) => (
              <span
                key={childIndex}
                className={`${child.bold ? "font-bold text-maingray" : ""} ${
                  child.italic ? "italic text-maingray" : ""
                } ${child.underline ? "underline text-maingray" : ""}`}
              >
                {child.text}
              </span>
            ))}
          </h1>
        );
      }

      if (desc.type === "quote") {
        return (
          <blockquote
            key={index}
            className="border-l-4 border-orange pl-4 ml-5 italic text-md max-md:text-sm mb-4 text-maingray"
          >
            {desc.children.map((child, childIndex) => (
              <span
                key={childIndex}
                className={`${child.bold ? "font-bold text-maingray" : ""} ${
                  child.italic ? "italic text-maingray" : ""
                } ${child.underline ? "underline text-maingray" : ""}`}
              >
                {child.text}
              </span>
            ))}
          </blockquote>
        );
      }

      if (desc.type === "image") {
        return (
          <div key={index} className="flex items-start mb-4">
            <LazyLoad offset={300} once>
              <img
                src={desc.image.url}
                alt="BlogImage"
                className="w-1/2 h-auto object-cover mr-4 "
              />
            </LazyLoad>
          </div>
        );
      }

      return null;
    });
  }

  return (
    <div>
      <Helmet>
        <title>{blogData.metaTitle}</title>
        <meta name="description" content={blogData.metaDescription} />
      </Helmet>

      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <div className="flex justify-between max-[1100px]:flex-col max-[1100px]:gap-4">
          <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
            {blogData.title}
          </h1>
          <div className="flex items-center max-[450px]:flex-wrap max-[450px]:justify-start">
            <Link
              to="/"
              className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300"
            >
              Главная /{" "}
            </Link>
            <Link
              to={`/${blogData.slugAbout}`}
              className="ml-1 font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300"
            >
              {blogData.titleAbout} /{" "}
            </Link>
            <Link
              to={`/${blogData.slug}`}
              className="ml-1 font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300"
            >
              {blogData.titleBlog} /{" "}
            </Link>
            <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
              {blogData.title}
            </p>
          </div>
        </div>

        <div className="mt-10">
          {blogData.posts_list.map((post) => (
            <div key={post.id} className="mb-8">
              <LazyLoad offset={300} once>
                <img
                  src={`${API_URL}${post.attributes.Media.data[0].attributes.formats.large.url}`}
                  alt="Blog"
                  className="w-full h-[250px] object-cover object-center mb-4 "
                />
              </LazyLoad>
              <div className=" py-2">
                {convertDescriptionToElements(post.attributes.BlogText)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { BlogDetail };
