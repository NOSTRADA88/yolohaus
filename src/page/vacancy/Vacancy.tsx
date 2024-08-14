import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchAboutData } from "../../api";
import { ActiveVacancies, Switch } from "../../components/vacancy";
import { ContactBanner } from "../../sections/banner";
import { Breadcrumbs } from "../../sections/breadcrumbs";
import { slug } from "../../constants";
import {fetchVacancyPage} from "../../api/vacancy";

interface ListItem {
  type: string;
  children: {
    text: string;
    type: string;
  }[];
}

interface VacancyAttribute {
  Title: string;
  Responsibilities: {
    type: string;
    format: string;
    children: ListItem[];
  }[];
  WorkingConditions: {
    type: string;
    format: string;
    children: ListItem[];
  }[];
  Requirements: {
    type: string;
    format: string;
    children: ListItem[];
  }[];
}

interface Vacancies {
  id: number;
  attributes: VacancyAttribute;
}

type TabType = "activeVacancies" | "brigade";

const Vacancy = () => {
  const [data, setData] = useState({
    metaTitle: "",
    metaDescription: "",
    title: "",
    titleAbout: "",
    vacancies: [] as Vacancies[],
  });

  const [activeTab, setActiveTab] = useState<TabType>("activeVacancies");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchVacancyPage();
        const aboutData = await fetchAboutData();

        setData({
          metaTitle: response.Metadata.MetaTitle,
          metaDescription: response.Metadata.MetaDescription,
          title: response.Title,
          titleAbout: aboutData.Title,
          vacancies: response.Vacancies.data,
        });
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };
    fetchData();
  }, []);

  const breadcrumbItems = [{ title: data.titleAbout, slug: slug.about }];

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
