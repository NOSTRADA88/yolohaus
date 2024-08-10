import { fetchData } from "./index";


export const fetchHomePage = () =>
    fetchData(
        "/api/glavnaya", "Metadata,Greetings,Mortgage.Photos,About.Information,Recommendations.List,PopularCottages.Projects,ContactsMap.WorkTime"
    )