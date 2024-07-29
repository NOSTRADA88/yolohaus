import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchAboutData, fetchBlogData } from "../../api";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { API_URL } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

interface ImageFormat {
  url: string;
}

interface Media {
  data: {
    id: number;
    attributes: {
      formats: {
        large: ImageFormat;
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
  titleAbout: string;
  slugAbout: string;
  title: string;
  posts_list: Post[];
  slugBlog: string;
}

const Blog = () => {
  const [blogData, setBlogData] = useState<BlogsData>({
    metaTitle: "",
    metaDescription: "",
    title: "",
    slugAbout: "",
    titleAbout: "",
    posts_list: [],
    slugBlog: "",
  });

  const fetchData = async () => {
    try {
      const blogsDataResponse = await fetchBlogData();
      const aboutData = await fetchAboutData();
      setBlogData({
        metaTitle: blogsDataResponse.Metadata.MetaTitle,
        metaDescription: blogsDataResponse.Metadata.MetaDescription,
        title: blogsDataResponse.Title,
        slugAbout: aboutData.slug,
        titleAbout: aboutData.Title,
        posts_list: blogsDataResponse.posts_list.data,
        slugBlog: blogsDataResponse.slug,
      });
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const truncateText = (text: string, limit: number) => {
    if (text.length <= limit) {
      return text;
    }
    return text.substring(0, limit) + "...";
  };
  return (
    <div>
      <Helmet>
        <title>{blogData.metaTitle}</title>
        <meta name="description" content={blogData.metaDescription} />
      </Helmet>

      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
          <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
            {blogData.title}
          </h1>
          <div className="flex items-center">
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
            <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
              {blogData.title}
            </p>
          </div>
        </div>

        <div className="mt-10">
          {blogData.posts_list.map((post) => (
            <div key={post.id} className="mb-8">
              <Link
                to={`/${blogData.slugBlog}/${post.attributes.slug}`}
                className="flex shadow-[0_0_20px_rgba(0,0,0,0.25)] mt-8 items-start max-lg:flex-col hover:shadow-[0_0_30px_rgba(0,0,0,0.25)]"
              >
                <div className="relative w-[60%] overflow-hidden max-lg:w-full h-[250px]  ">
                  <LazyLoad offset={300} once>
                    <img
                      src={`${API_URL}${post.attributes.Media.data[0].attributes.formats.large.url}`}
                      alt="Stock"
                      className="w-full h-[250px] object-cover object-center"
                    />
                  </LazyLoad>
                  <div className="absolute top-0 left-[-10px] bg-maingray text-xs px-3 py-2 opacity-80 parallelogram">
                    <p className="ml-2 text-white noparallelogram text-base font-medium uppercase ">
                      yolo
                      <span className="text-orange">haus</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col w-full justify-between p-4 mt-4  cursor-pointer group ">
                  <div>
                    <p className="text-maingray font-bold font-museo text-2xl max-sm:text-lg group-hover:text-orange">
                      {post.attributes.Title}
                    </p>
                    <div className=" mt-5">
                      <p className="text-base font-light font-museo text-maingray text-justify">
                        {post.attributes.BlogText.map((block, index) => (
                          <p
                            key={index}
                            className="mt-4 text-maingray font-museo text-md max-md:text-sm"
                          >
                            {block.children.map((child, childIndex) => (
                              <span key={childIndex}>
                                {truncateText(child.text, 400)}{" "}
                              </span>
                            ))}
                          </p>
                        ))}
                      </p>
                      <div className="flex justify-start items-center mt-5 gap-2 cursor-pointer arrow-container ">
                        <Link
                          to={`/${blogData.slugBlog}/${post.attributes.slug}`}
                          className="text-orange uppercase text-sm font-medium tracking-wider"
                        >
                          Подробнее{" "}
                        </Link>
                        <FontAwesomeIcon
                          icon={faArrowRightLong}
                          className="text-orange arrow-icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
