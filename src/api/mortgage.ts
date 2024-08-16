import {fetchData} from "./index";

export const fetchMortgagePage = (signal: AbortSignal) =>
    fetchData("/api/ipoteka", "Metadata,banks_list.Photo,Photo", signal);
