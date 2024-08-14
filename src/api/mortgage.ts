import {fetchData} from "./index";

export const fetchMortgagePage = () =>
    fetchData("/api/ipoteka", "Metadata,banks_list.Photo,Photo");
