import {fetchData} from "./index";

export const fetchVacancyPage = (signal: AbortSignal) =>
    fetchData("/api/vakansii", "Metadata,Vacancies", signal);