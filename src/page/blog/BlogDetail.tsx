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

interface Post {
  id: number;
  attributes: {
    Title: string;
    BlogText: { type: string; children: { text: string }[] }[];
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

      console.log(blogDetailsData);
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
              className="ml-1 font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "
            >
              {" "}
              {blogData.titleAbout} /{" "}
            </Link>
            <Link
              to={`/${blogData.slug}`}
              className="ml-1 font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "
            >
              {" "}
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
                  alt="Stock"
                  className="w-full h-[250px] object-cover object-center"
                />
              </LazyLoad>
              <h2 className="text-maingray font-museo font-bold text-2xl max-md:text-xl">
                {post.attributes.Title}
              </h2>
              {post.attributes.BlogText.map((block, index) => (
                <p className="text-base font-light font-museo text-maingray text-justify">
                  {post.attributes.BlogText.map((block, index) => (
                    <p
                      key={index}
                      className="mt-4 text-maingray font-museo text-md max-md:text-sm"
                    >
                      {block.children.map((child, childIndex) => (
                        <span key={childIndex}>{child.text}</span>
                      ))}
                    </p>
                  ))}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
