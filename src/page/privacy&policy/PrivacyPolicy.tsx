import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import usePrivacyPolicyPage from "../../hooks/usePrivacyPolicyPage";
import renderTextWithHighlights from "../../utilts/renderTextWithHighlights";

const PrivacyPolicy = () => {
  const { privacyPolicyData, isLoading, error } = usePrivacyPolicyPage();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text-red-500 text-base font-museo">
          Произошла ошибка. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  if (!privacyPolicyData) {
    return (
      <div className="flex justify-center items-center mt-8 mb-8">
        <div className="text- text-base font-museo">
          Данные недоступны. Пожалуйста, попробуйте позже.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{privacyPolicyData.metadata.title}</title>
        <meta
          name="description"
          content={privacyPolicyData.metadata.description}
        />
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

export default PrivacyPolicy;
