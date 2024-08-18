import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { API_URL, slug } from "../../constants";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import {
  CardDescription,
  CardDescriptionParagraph,
  CardDescriptionText,
} from "../../interfaces";
import useBlogPage from "../../hooks/useBlogPage";

const Blog = () => {
  const {blogData, isLoading, error} = useBlogPage();

  //TODO сделать страницку, что типа данных нема, отдельно if (!aboutData) {<div>...</div>}
  // Сделать норм обработку ошибки error
  if (!blogData || isLoading) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

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

  const breadcrumbItems = [{ title: "О компании", slug: slug.about }];

  return (
    <div>
      <Helmet>
        <title>{blogData.metadata.title}</title>
        <meta name="description" content={blogData.metadata.description} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs items={breadcrumbItems} finalTitle={blogData.title} />
        <div className="mt-10">
          {blogData.posts.map((post, index) => (
            <div className="mb-8" key={index}>
              <Link
                to={`${slug.blog}/${post.slug}`}
                className="flex shadow-[0_0_20px_rgba(0,0,0,0.25)] mt-8 items-start max-lg:flex-col hover:shadow-[0_0_30px_rgba(0,0,0,0.25)]"
              >
                <div className="relative w-[60%] overflow-hidden max-lg:w-full h-[250px]">
                  <img
                    src={`${API_URL}${post.photo.url}`}
                    alt={post.photo.name}
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
                        <span className="text-orange uppercase text-sm font-medium tracking-wider">
                          Подробнее
                        </span>
                        <p className="text-orange arrow-icon"> ➜ </p>
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

export default Blog ;
