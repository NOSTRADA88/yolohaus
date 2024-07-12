import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { fetchAboutData, fetchVacancyData } from "../../api";
import { ActiveVacancies, Switch } from "../../components/vacancy";
import { Link, useLocation } from "react-router-dom";
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

type Vacancy = {
  id: number;
  attributes: VacancyAttribute;
};
type TabType = "activeVacancies" | "brigade";
const Vacancy = () => {
  const [metaTitle, setMetaTitle] = useState<string>("");
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [titleAbout, setTitleAbout] = useState<string>("");
  const [slugAbout, setSlugAbout] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabType>("activeVacancies");
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const fetchData = async () => {
    try {
      const vacancyData = await fetchVacancyData();
      const aboutData = await fetchAboutData();

      setMetaTitle(vacancyData.Metadata.MetaTitle);
      setMetaDescription(vacancyData.Metadata.MetaDescription);
      setTitle(vacancyData.Title);
      setTitleAbout(aboutData.Title);
      setSlugAbout(aboutData.slug);
      setVacancies(vacancyData.Vacancies.data);
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
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <div className="w-full max-w-[1111px] mx-auto mt-20 max-[1111px]:px-12 max-sm:px-5 max-md:mt-16 mb-32 max-md:mb-28">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-4">
          <h1 className="text-maingray font-museo font-bold text-3xl max-md:text-2xl">
            {title}
          </h1>
          <div className="flex items-center">
            <Link
              to="/"
              className="font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "
            >
              Главная /{" "}
            </Link>
            <Link
              to={`/${slugAbout}`}
              className="ml-1 font-museo font-light text-sm text-orange max-md:text-xs hover:text-lightgray transition-all duration-300 "
            >
              {" "}
              {titleAbout} /{" "}
            </Link>
            <p className="ml-1 font-museo font-light text-sm text-lightgray max-md:text-xs">
              {" "}
              {title}
            </p>
          </div>
        </div>
        <Switch activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "activeVacancies" && (
          <ActiveVacancies vacancies={vacancies} />
        )}
        {activeTab === "brigade" && <ContactBanner />}
      </div>
    </div>
  );
};

export default Vacancy;
