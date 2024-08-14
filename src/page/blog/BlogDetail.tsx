import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { API_URL, slug } from "../../constants";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import {
  BlogDetailProps,
  CardDescription,
  Photo,
  Post,
} from "../../interfaces";
import { fetchBlogDetailPage } from "../../api/blog";

const BlogDetail = ({ blogSlug }: BlogDetailProps) => {
  const [postData, setPostData] = useState<Post>({
    metaTile: "",
    metaDescription: "",
    title: "",
    text: [] as CardDescription[],
    photo: [] as Photo[],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBlogDetailPage(blogSlug);
        setPostData({
          metaTile: response.data[0].attributes.Metadata.MetaTitle,
          metaDescription: response.data[0].attributes.Metadata.MetaDescription,
          title: response.data[0].attributes.Title,
          text: response.data[0].attributes.BlogText.map((item: any) => {
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
          photo: response.data[0].attributes.Media.data.map((photo: any) => ({
            name: photo.attributes.name,
            url: photo.attributes.url,
          })),
        });
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
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
            {postData.photo.length > 0 && (
              <img
                src={`${API_URL}${postData.photo[0].url}`}
                alt="Blog"
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
