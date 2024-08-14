import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchAboutData } from "../../api";
import { Link } from "react-router-dom";
import { API_URL, slug } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import {
  BlogsData,
  CardDescription,
  CardDescriptionParagraph,
  CardDescriptionText,
} from "../../interfaces";
import {fetchBlogPage} from "../../api/blog";

const Blog = () => {
  const [blogData, setBlogData] = useState<BlogsData>({
    metaTitle: "",
    metaDescription: "",
    title: "",
    titleAbout: "",
    posts: [],
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetchBlogPage();
        // убрать либо использовать useQuery для этого фетча
        const aboutData = await fetchAboutData();
        setBlogData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
          title: response.Title,
          // Делать дорогостоящий запрос для тайтла ?? нужно переделать
          titleAbout: aboutData.Title,
          posts: response.posts_list.data.map((post: any) => ({
            title: post.attributes.Title,
            text: post.attributes.BlogText,
            slug: post.attributes.slug,
            photo: post.attributes.Media.data.map((photo: any) => ({
              name: photo.attributes.name,
              url: photo.attributes.url,
            })),
          })),
        });
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
    fetchBlog()
  }, []);

  console.log(blogData);

  const truncateText = (text: string | undefined, limit: number) => {
    if (!text) return "";
    if (text.length <= limit) {
      return text;
    }
    return text.substring(0, limit);
  };

  const getFirstTwoParagraphsText = (blogText: CardDescription[]) => {
    const paragraphs = blogText
      .filter(
        (block): block is CardDescriptionParagraph => block.type === "paragraph"
      )
      .slice(0, 2);
    const text = paragraphs
      .map((paragraph) =>
        paragraph.children
          .map((child: CardDescriptionText) => truncateText(child.text, 300))
          .join(" ")
      )
      .join(" ");
    return text + (paragraphs.length > 1 ? "..." : "");
  };

  const breadcrumbItems = [{ title: blogData.titleAbout, slug: slug.about }];

  return (
    <div>
      <Helmet>
        <title>{blogData.metaTitle}</title>
        <meta name="description" content={blogData.metaDescription} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs items={breadcrumbItems} finalTitle={blogData.title} />
        <div className="mt-10">
          {blogData.posts.map((post) => (
            <div className="mb-8">
              <Link
                to={`${slug.blog}/${post.slug}`}
                className="flex shadow-[0_0_20px_rgba(0,0,0,0.25)] mt-8 items-start max-lg:flex-col hover:shadow-[0_0_30px_rgba(0,0,0,0.25)]"
              >
                <div className="relative w-[60%] overflow-hidden max-lg:w-full h-[250px]">
                  <img
                    src={`${API_URL}${post.photo[0].url}`}
                    alt="Stock"
                    className="w-full h-[250px] object-cover object-center"
                  />
                  <div className="absolute top-0 left-[-10px] bg-maingray text-xs px-3 py-2 opacity-80 parallelogram">
                    <p className="ml-2 text-white noparallelogram text-base font-medium uppercase">
                      yolo
                      <span className="text-orange">haus</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col w-full justify-between p-[10px] mt-4 cursor-pointer group">
                  <div>
                    <p className="text-maingray font-bold font-museo text-2xl max-sm:text-lg group-hover:text-orange">
                      {post.title}
                    </p>
                    <div className="mt-5">
                      <p className="text-base font-light font-museo text-maingray text-justify">
                        {getFirstTwoParagraphsText(post.text)}
                      </p>
                      <div className="flex justify-start items-center mt-5 gap-2 cursor-pointer arrow-container">
                        <Link
                          to={`/${slug.blog}/${post.slug}`}
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

export { Blog };
