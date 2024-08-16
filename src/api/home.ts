import { fetchData } from "./index";

export const fetchHomePage = (signal: AbortSignal) =>
    fetchData(
        "/api/glavnaya", "Metadata,Greetings,Mortgage.Photos,About.Information,Recommendations.List.BgPhoto,Recommendations.List.Icon,PopularCottages.Projects.Parameters,PopularCottages.Projects.Complectation,PopularCottages.Projects.Photos,PopularCottages.Icons.Photo,ContactsMap.WorkTime",
        signal
    )