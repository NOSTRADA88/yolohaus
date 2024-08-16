import { Helmet } from "react-helmet";
import { API_URL, slug } from "../../constants";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { BlogDetailProps, CardDescription } from "../../interfaces";
import useBlogDetailPage from "../../hooks/useBlogDetailPage";

const BlogDetail = ({ blogSlug }: BlogDetailProps) => {
  const postData = useBlogDetailPage({ blogSlug: blogSlug || "" });

  if (!postData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }
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
        if (desc.format === "ordered") {
          return (
            <ol key={index} className="list-decimal pl-10">
              {desc.children.map((listItem, listIndex) => (
                <li
                  key={listIndex}
                  className="font-museo text-md max-md:text-sm leading-relaxed font-light mb-2 text-maingray"
                >
                  {listItem.children.map((item, itemIndex) => (
                    <span
                      key={itemIndex}
                      className={`${
                        item.bold ? "font-bold text-maingray" : ""
                      } ${item.italic ? "italic text-maingray" : ""} ${
                        item.underline ? "underline text-maingray" : ""
                      }`}
                    >
                      {item.text}
                    </span>
                  ))}
                </li>
              ))}
            </ol>
          );
        } else {
          return (
            <ul key={index} className="custom-list ">
              {desc.children.map((listItem, listIndex) => (
                <li
                  key={listIndex}
                  className="font-museo text-md max-md:text-sm leading-relaxed font-light mb-2 text-maingray"
                >
                  {listItem.children.map((item, itemIndex) => (
                    <span
                      key={itemIndex}
                      className={`${
                        item.bold ? "font-bold text-maingray" : ""
                      } ${item.italic ? "italic text-maingray" : ""} ${
                        item.underline ? "underline text-maingray" : ""
                      }`}
                    >
                      {item.text}
                    </span>
                  ))}
                </li>
              ))}
            </ul>
          );
        }
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
              src={desc.photo.url}
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
    { title: "О компании", slug: slug.about },
    { title: "Блог", slug: slug.blog },
  ];

  return (
    <div>
      <Helmet>
        <title>{postData.metaTile}</title>
        <meta name="description" content={postData.metaDescription} />
      </Helmet>

      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs items={breadcrumbItems} finalTitle={postData.title} />
        <div className="mt-10">
          <div className="mb-8">
            {postData.photo && (
              <img
                src={`${API_URL}${postData.photo.url}`}
                alt={postData.photo.name}
                className="w-full h-[250px] object-cover object-center mb-4 "
              />
            )}
            <div className="py-2">
              {convertDescriptionToElements(postData.text)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BlogDetail };
