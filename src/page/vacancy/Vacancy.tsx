import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ActiveVacancies, Switch } from "../../components/vacancy";
import { ContactBanner } from "../../sections/banner";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { slug } from "../../constants";
import { fetchVacancyPage } from "../../api/vacancy";
import { Vacancies } from "../../interfaces";

type TabType = "activeVacancies" | "brigade";

const Vacancy = () => {
  const [data, setData] = useState({
    metaTitle: "",
    metaDescription: "",
    title: "",
    vacancies: [] as Vacancies[],
  });

  const [activeTab, setActiveTab] = useState<TabType>("activeVacancies");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchVacancyPage();
        setData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
          title: response.Title,
          vacancies: response.Vacancies.data.map((vacancy: any) => ({
            id: vacancy.id,
            title: vacancy.attributes.Title,
            responsibilities: vacancy.attributes.Responsibilities,
            workingConditions: vacancy.attributes.WorkingConditions,
            requirements: vacancy.attributes.Requirements,
          })),
        });
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
    fetchData();
  }, []);

  const breadcrumbItems = [{ title: "О компании", slug: slug.about }];

  return (
    <div>
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
      </Helmet>
      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <Breadcrumbs items={breadcrumbItems} finalTitle={data.title} />
        <Switch activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "activeVacancies" && (
          <ActiveVacancies vacancies={data.vacancies} />
        )}
        {activeTab === "brigade" && <ContactBanner />}
      </div>
    </div>
  );
};

export { Vacancy };
