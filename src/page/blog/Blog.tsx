import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchAboutData, fetchBlogData } from "../../api";
import { Link } from "react-router-dom";

interface BlogsData {
  metaTitle: string;
  metaDescription: string;
  titleAbout: string;
  slugAbout: string;
  title: string;
}

const Blog = () => {
  const [blogData, setBlogData] = useState<BlogsData>({
    metaTitle: "",
    metaDescription: "",
    title: "",
    slugAbout: "",
    titleAbout: "",
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
      });
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      </div>
    </div>
  );
};

export default Blog;
