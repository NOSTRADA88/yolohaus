import { useEffect, useState } from "react";
import { fetchAboutData, fetchBlogData, fetchBlogDetailData } from "../../api";
import { Helmet } from "react-helmet";
import { API_URL, slug } from "../../constants";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { BlogDetailProps, BlogsData, CardDescription } from "../../interfaces";

const BlogDetail = ({ blogSlug }: BlogDetailProps) => {
  const [blogData, setBlogData] = useState<BlogsData>({
    metaTitle: "",
    metaDescription: "",
    title: "",
    titleBlog: "",
    titleAbout: "",
    posts_list: [],
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
        posts_list: blogsDataResponse.posts_list.data.map((post: any) => ({
          Title: post.attributes.Title,
          BlogText: post.attributes.BlogText,
          slug: post.attributes.slug,
          Media: post.attributes.Media.data.map((photo: any) => ({
            name: photo.attributes.name,
            url: photo.attributes.url,
          })),
        })),
        titleBlog: blogsDataResponse.Title,
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
            <img
              src={desc.image.url}
              alt="BlogImage"
              className="w-1/2 h-auto object-cover mr-4 "
            />
          </div>
        );
      }

      return null;
    });
  }

  const breadcrumbItems = [
    { title: blogData.titleAbout, slug: slug.about },
    { title: blogData.titleBlog, slug: slug.blog },
  ];
  return (
    <div>
      <Helmet>
        <title>{blogData.metaTitle}</title>
        <meta name="description" content={blogData.metaDescription} />
      </Helmet>

      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs items={breadcrumbItems} finalTitle={blogData.title} />
        <div className="mt-10">
          {blogData.posts_list.map((post) => (
            <div className="mb-8">
              <img
                src={`${API_URL}${post.Media[0].url}`}
                alt="Blog"
                className="w-full h-[250px] object-cover object-center mb-4 "
              />
              <div className=" py-2">
                {convertDescriptionToElements(post.BlogText)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { BlogDetail };
