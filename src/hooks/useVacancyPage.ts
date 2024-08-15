import { useEffect, useState } from "react";
import { fetchVacancyPage } from "../api/vacancy";
import { VacancyPagesData } from "../interfaces";

const useVacancyPage = () => {
  const [vacancyData, setVacancyData] = useState<VacancyPagesData>();
  useEffect(() => {
    const fetchVacancyData = async () => {
      try {
        const response = await fetchVacancyPage();
        setVacancyData({
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
    fetchVacancyData();
  }, []);

  return vacancyData;
};

export default useVacancyPage;
