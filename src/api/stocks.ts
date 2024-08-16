import {fetchData} from "./index";

export const fetchStocksPage = (signal: AbortSignal) =>
    fetchData("/api/akczii", "stock_list.Photo,Metadata", signal);
