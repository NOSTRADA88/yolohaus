import {fetchData} from "./index";

export const fetchVacancyPage = () =>
    fetchData("/api/vakansii", "Metadata,Vacancies");