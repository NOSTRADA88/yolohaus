import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchAboutData, fetchVacancyData } from "../../api";
import { ActiveVacancies, Switch } from "../../components/vacancy";
import { Link } from "react-router-dom";
import { ContactBanner } from "../../sections/banner";

type ListItem = {
  type: string;
  children: {
    text: string;
    type: string;
  }[];
};

type VacancyAttribute = {
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
};

type Vacancies = {
  id: number;
  attributes: VacancyAttribute;
};
type TabType = "activeVacancies" | "brigade";
const Vacancy = () => {
  const [data, setData] = useState({
    metaTitle: "",
    metaDescription: "",
    title: "",
    titleAbout: "",
    slugAbout: "",
    vacancies: [] as Vacancies[],
  });

  const [activeTab, setActiveTab] = useState<TabType>("activeVacancies");

  const fetchData = async () => {
    try {
      const vacancyData = await fetchVacancyData();
      const aboutData = await fetchAboutData();

      setData({
        metaTitle: vacancyData.Metadata.MetaTitle,
        metaDescription: vacancyData.Metadata.MetaDescription,
        title: vacancyData.Title,
        titleAbout: aboutData.Title,
        slugAbout: aboutData.slug,
        vacancies: vacancyData.Vacancies.data,
      });
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>{data.metaTitle}</title>
        <meta name="description" content={data.metaDescription} />
      </Helmet>

      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
          <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
            {data.title}
          </h1>
          <div className="flex items-center">
            <Link
              to="/"
              className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "
            >
              Главная /{" "}
            </Link>
            <Link
              to={`/${data.slugAbout}`}
              className="ml-1 font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "
            >
              {" "}
              {data.titleAbout} /{" "}
            </Link>
            <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
              {" "}
              {data.title}
            </p>
          </div>
        </div>
        <Switch activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "activeVacancies" && (
          <ActiveVacancies vacancies={data.vacancies} />
        )}
        {activeTab === "brigade" && <ContactBanner />}
      </div>
    </div>
  );
};

export {Vacancy};
