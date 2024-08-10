import { fetchData } from "./index";


export const fetchMainPage = () =>
    fetchData(
        "/api/glavnaya",
        "Metadata,Greetings,Mortgage,About.Information,Recommendations.List,PopularCottages.Projects"
    )