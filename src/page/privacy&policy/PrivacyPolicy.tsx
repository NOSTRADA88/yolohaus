import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { slug } from "../../constants";
import usePrivacyPolicyPage from "../../hooks/usePrivacyPolicyPage";

const PrivacyPolicy = () => {
  const privacyPolicyData = usePrivacyPolicyPage();

  if (!privacyPolicyData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  const renderTextWithHighlights = (text: string) => {
    const parts = text.split(/(YoloHaus)/);
    return parts.map((part, index) =>
      part === "YoloHaus" ? (
        <Link key={index} to={slug.main} className="text-orange underline">
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
        <Breadcrumbs finalTitle={privacyPolicyData.title} />
        <div className="mt-10">
          {privacyPolicyData.description.map((paragraph, index) => (
            <p key={index} className="text-justify mb-6">
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

export { PrivacyPolicy };
