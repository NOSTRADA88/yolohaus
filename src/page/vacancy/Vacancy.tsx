import { useState } from "react";
import { Helmet } from "react-helmet";
import { ActiveVacancies, Switch } from "../../components/vacancy";
import { ContactBanner } from "../../sections/banner";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { slug } from "../../constants";
import useVacancyPage from "../../hooks/useVacancyPage";
import { TabType } from "../../interfaces";

const Vacancy = () => {
  const { vacancyData, isLoading, error } = useVacancyPage();

  const [activeTab, setActiveTab] = useState<TabType>("activeVacancies");

  const breadcrumbItems = [{ title: "О компании", slug: slug.about }];
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

  if (!vacancyData) {
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
        <title>{vacancyData.metadata.title}</title>
        <meta name="description" content={vacancyData.metadata.description} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs items={breadcrumbItems} finalTitle={vacancyData.title} />
        <Switch activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "activeVacancies" && (
          <ActiveVacancies vacancies={vacancyData.vacancies} />
        )}
        {activeTab === "brigade" && <ContactBanner />}
      </div>
    </div>
  );
};

export default Vacancy;
