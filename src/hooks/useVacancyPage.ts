import {useCallback, useEffect, useState} from "react";
import { fetchVacancyPage } from "../api/vacancy";
import { VacancyPagesData } from "../interfaces";

const useVacancyPage = () => {
  const [vacancyData, setVacancyData] = useState<VacancyPagesData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>()

  const fetchVacancyData = useCallback(async (signal: AbortSignal) => {
    try {
      const response = await fetchVacancyPage(signal);
      setVacancyData({
        metadata: {
          title: response.Metadata.MetaTitle,
          description: response.Metadata.MetaDescription
        },
        title: response.Title,
        vacancies: response.Vacancies.data.map((vacancy: any) => ({
          id: vacancy.id,
          title: vacancy.attributes.Title,
          responsibilities: vacancy.attributes.Responsibilities,
          workingConditions: vacancy.attributes.WorkingConditions,
          requirements: vacancy.attributes.Requirements,
        })),
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(Error(`unknown error occurred: ${error}`))
      }
    } finally {
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController;
    fetchVacancyData(abortController.signal);
    return () => abortController.abort();
  }, [vacancyData]);

  return {vacancyData, isLoading, error};
};

export default useVacancyPage;
