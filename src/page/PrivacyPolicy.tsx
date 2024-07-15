import { useEffect, useState } from "react";
import { fetchPrivacyPolicyData } from "../api";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

interface Child {
  text: string;
  bold?: boolean;
}

interface Paragraph {
  type: string;
  children: Child[];
}

interface PrivacyPolicyData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  description: Paragraph[];
}

const PrivacyPolicy = () => {
  const [privacyPolicyData, setPrivacyPolicyData] = useState<PrivacyPolicyData>(
    {
      metaTitle: "",
      metaDescription: "",
      title: "",
      description: [],
    }
  );

  const fetchData = async () => {
    try {
      const privacyData = await fetchPrivacyPolicyData();
      setPrivacyPolicyData({
        metaTitle: privacyData.Metadata.MetaTitle,
        metaDescription: privacyData.Metadata.MetaDescription,
        title: privacyData.Title,
        description: privacyData.Description,
      });
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderTextWithHighlights = (text: string) => {
    const parts = text.split(/(YoloHaus)/);
    return parts.map((part, index) =>
      part === "YoloHaus" ? (
        <Link key={index} to="/" className="text-orange underline">
          {part}
        </Link>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      <Helmet>
        <title>{privacyPolicyData.metaTitle}</title>
        <meta name="description" content={privacyPolicyData.metaDescription} />
      </Helmet>

      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12  max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <div className="flex justify-between max-[680px]:flex-col max-sm:gap-4 ">
          <h1 className="text-maingray font-museo font-bold text-3xl max-[900px]:text-2xl">
            {privacyPolicyData.title}
          </h1>
          <div className="flex items-center">
            <Link
              to="/"
              className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300"
            >
              Главная /{" "}
            </Link>
            <p className="ml-1 font-museo font-light text-sm text-lightgray max-[900px]:text-xs">
              {" "}
              {privacyPolicyData.title}
            </p>
          </div>
        </div>
        <div className="mt-10">
          {privacyPolicyData.description.map((paragraph, index) => (
            <p key={index} className="text-justify mb-6 ">
              {paragraph.children.map((child, childIndex) => (
                <span
                  key={childIndex}
                  className="font-museo text-sm"
                  style={{ fontWeight: child.bold ? "bold" : "light" }}
                >
                  {renderTextWithHighlights(child.text)}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
